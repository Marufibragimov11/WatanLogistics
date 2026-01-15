from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'role', 'password', 'is_active')

    def validate_role(self, value):
        if value == 'admin':
            # Check if we are creating a new admin or updating an existing non-admin to admin
            is_new = self.instance is None
            is_update_to_admin = self.instance and self.instance.role != 'admin'
            
            if is_new or is_update_to_admin:
                admin_count = User.objects.filter(role='admin').count()
                if admin_count >= 3:
                    raise serializers.ValidationError("Admin limit reached. Maximum 3 administrators allowed.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # Use create_user to ensure email normalization and standard creation logic
        user = User.objects.create_user(**validated_data, password=password)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class PasswordResetSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, min_length=6)

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=6)
