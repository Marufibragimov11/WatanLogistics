from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CompanySettings
from .serializers import CompanySettingsSerializer

class CompanySettingsView(APIView):
    # Allow read-only access to authenticated users
    def get(self, request):
        company, created = CompanySettings.objects.get_or_create(id=1)
        serializer = CompanySettingsSerializer(company)
        return Response(serializer.data)

    def patch(self, request):
        # Only admin can update settings
        if request.user.role != 'admin':
            return Response({"error": "Only admins can update company settings."}, status=403)

        company, created = CompanySettings.objects.get_or_create(id=1)
        serializer = CompanySettingsSerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
