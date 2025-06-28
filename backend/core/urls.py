from django.urls import path
from .views import (
    CourseListView, CreateAssignmentView, AssignmentListView,
    SubmissionListView, CreateSubmissionView, SubmissionListByAssignmentView,
    RegisterView, LoginView, GradeSubmissionView, UpdateAssignmentStatusView
)

urlpatterns = [
    # 🔐 Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    # 📚 Courses & Assignments
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('assignments/create/', CreateAssignmentView.as_view(), name='create-assignment'),
    path('assignments/<str:course_code>/', AssignmentListView.as_view(), name='assignment-list'),
    path('assignments/<int:pk>/status/', UpdateAssignmentStatusView.as_view(), name='update-assignment-status'),

    # 📤 Submissions
    path('submit/', CreateSubmissionView.as_view(), name='create-submission'),
    path('submissions/', SubmissionListView.as_view(), name='submission-list'),
    path('submissions/by-assignment/', SubmissionListByAssignmentView.as_view(), name='submissions-by-assignment'),
    path('grade/<int:pk>/', GradeSubmissionView.as_view(), name='grade-submission'),
]
