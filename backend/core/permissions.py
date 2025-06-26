from rest_framework import permissions

class IsLecturer(permissions.BasePermission):
    """
    Allows access only to users with the role 'lecturer'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'lecturer'
