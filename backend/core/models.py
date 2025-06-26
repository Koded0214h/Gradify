from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    matric_number = models.CharField(max_length=20, blank=True, null=True, unique=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

    
class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.code

class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    instructions = models.TextField()
    total_marks = models.IntegerField()
    due_date = models.DateTimeField()

    def __str__(self):
        return self.title

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    code_file = models.FileField(upload_to='submissions/', null=True, blank=True)
    code_text = models.TextField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    score = models.FloatField(null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)
    is_graded = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.username} - {self.assignment.title}"
