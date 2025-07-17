from django.contrib import admin

from .models import Course, Assignment, CustomUser, Submission

# course = Course.objects.create(name='Data Structures and Algorithms', code='CSC106')
# Assignment.objects.create(
#     course=course,
#     title='Implement Stack Using Linked List',
#     instructions='Submit working code with comments',
#     total_marks=20,
#     due_date='2025-07-01 23:59'
# )

admin.site.register(CustomUser)
admin.site.register(Course)
admin.site.register(Assignment)
admin.site.register(Submission)
