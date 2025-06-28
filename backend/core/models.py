from django.contrib.auth.models import AbstractUser
from django.db import models


from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, matric_number, email, first_name, last_name, role, password=None, **extra_fields):
        if not matric_number:
            raise ValueError('The Matric Number must be set')
        email = self.normalize_email(email)
        user = self.model(
            matric_number=matric_number,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, matric_number, email, first_name, last_name, role='lecturer', password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(matric_number, email, first_name, last_name, role, password, **extra_fields)


class CustomUser(AbstractUser):

    ROLE_CHOICES = (
        ('student', 'Student'),
        ('lecturer', 'Lecturer')
    )
    
    username = None
    matric_number = models.CharField(max_length=20, unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    email = models.EmailField('email address', unique=True)

    USERNAME_FIELD = 'matric_number'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'role']

    objects = CustomUserManager()  # 👉 Plug in your custom manager

    def __str__(self):
        return f"{self.matric_number} ({self.role})"    



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
    is_pending = models.BooleanField(default=True)

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
        return f"{self.student.matric_number} - {self.assignment.title}"
