from rest_framework import permissions

class LoadHistoryRolePermission(permissions.BasePermission):
    """
    Admin/Manager: Full CRUD
    Dispatch: List/Retrieve all. Create linked to self. Edit/Delete linked to self?
              Requirement: "Dispatch -> create & edit loads assigned to them"
              We can enforce 'create' assigns self in ViewSet.
              We enforce edit only if obj.dispatcher == user.
    Accounting: Read Only
    Driver: No Access
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
            
        role = request.user.role
        
        if role == 'driver':
            return False
            
        if role in ['admin', 'manager', 'dispatch']:
            return True
            
        if role in ['accounting']:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False
            
        return False

    def has_object_permission(self, request, view, obj):
        role = request.user.role
        
        if role in ['admin', 'manager']:
            return True
            
        if role == 'dispatch':
            # Can read all
            if request.method in permissions.SAFE_METHODS:
                return True
            # Can edit/delete only if they are the assigned dispatcher
            return obj.dispatcher == request.user
            
        return False
