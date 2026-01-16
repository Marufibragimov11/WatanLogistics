from rest_framework import permissions

class DriverRolePermission(permissions.BasePermission):
    """
    Admin/Manager: Full CRUD
    Dispatch/Accounting: Read Only
    Driver: No Access
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
            
        role = request.user.role
        
        # Determine access based on role
        if role == 'driver':
            return False
        
        if role in ['admin', 'manager']:
            return True
            
        if role in ['dispatch', 'accounting']:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False
            
        return False
