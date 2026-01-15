from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model

User = get_user_model()

class DashboardStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        
        # Role counts
        dispatchers = User.objects.filter(is_dispatcher=True).count()
        drivers = User.objects.filter(is_driver=True).count()
        managers = User.objects.filter(is_manager=True).count()

        data = {
            "total_users": total_users,
            "active_users": active_users,
            "roles": {
                "dispatchers": dispatchers,
                "drivers": drivers,
                "managers": managers,
            },
            "system_status": "Healthy",
        }
        return Response(data)
