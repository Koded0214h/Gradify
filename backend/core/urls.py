from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from .views import *

urlpatterns = [
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('assignments/create/', CreateAssignmentView.as_view(), name='create-assignment'),
    path('assignments/<str:course_code>/', AssignmentListView.as_view(), name='assignment-list'),
    path('submissions/', SubmissionListView.as_view(), name='submission-list'),
    path('submit/', CreateSubmissionView.as_view(), name='create-submission'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('submissions/', SubmissionListByAssignmentView.as_view(), name='submissions-by-assignment'),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)