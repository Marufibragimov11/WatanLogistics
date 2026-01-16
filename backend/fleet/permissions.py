from rest_framework import permissions

class IsAdminOrManagerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow Admins and Managers to edit objects.
    Others can only view.
    """

    def has_permission(self, request, view):
        # Allow read-only permissions for any authenticated user
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to admin and manager
        if request.user.is_authenticated:
            return request.user.role in ['admin', 'manager'] or request.user.is_staff
        
        return False
