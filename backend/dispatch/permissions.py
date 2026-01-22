from rest_framework import permissions

class DispatchRolePermission(permissions.BasePermission):
    """
    Admin/Manager: Full CRUD
    Dispatch: Edit status, notes, eta only (handled in validaton or partial updates).
              But technically DRF permissions are method based.
              So Dispatch can PUT/PATCH to specific fields?
              Let's allow PUT/PATCH for Dispatch, but we rely on serializer or frontend 
              to limit fields? Or assume Dispatch trusts not to delete?
              Requirement: "Dispatch -> update status, notes, ETA only".
              So we should block DELETE and POST for Dispatch.
    Accounting: Read Only
    Driver: No Access
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
            
        role = request.user.role
        
        if role == 'driver':
            return False
            
        if role in ['admin', 'manager']:
            return True
        
        # Dispatchers can list and update, but not create or delete?
        # Requirement: "can create dispatch row (admin, manager)" -> Dispatch cannot Create.
        if role == 'dispatch':
            if request.method in ['GET', 'PUT', 'PATCH', 'OPTIONS', 'HEAD']:
                return True
            return False
            
        if role in ['accounting']:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False
            
        return False
