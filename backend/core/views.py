from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.ai.mark import grade_with_gemini
from .models import Course, Assignment, Submission, CustomUser
from .serializers import (
    CourseSerializer, AssignmentSerializer, SubmissionSerializer,
    CreateSubmissionSerializer, RegisterSerializer, UserSerializer,
    CreateAssignmentSerializer
)
from .permissions import IsLecturer


# --------------------
# 🔐 AUTHENTICATION
# --------------------

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=400)
        try:
            self.perform_create(serializer)
        except Exception as e:
            print("🔥 Exception in register:", str(e))
            return Response({"error": str(e)}, status=500)
        return Response(serializer.data, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        matric_number = request.data.get("matric_number")
        password = request.data.get("password")

        # Check for missing fields
        field_errors = {}
        if not matric_number:
            field_errors["matric_number"] = "Matric number is required."
        if not password:
            field_errors["password"] = "Password is required."
        if field_errors:
            return Response(field_errors, status=400)

        # Check if user exists
        try:
            user_obj = CustomUser.objects.get(matric_number=matric_number)
        except CustomUser.DoesNotExist:
            return Response({"matric_number": "No user with this matric number."}, status=400)

        # Authenticate
        user = authenticate(matric_number=matric_number, password=password)
        if not user:
            return Response({"password": "Incorrect password."}, status=400)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": UserSerializer(user).data
        })


# --------------------
# 📚 COURSES & ASSIGNMENTS
# --------------------

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]


class AssignmentListView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_code = self.kwargs['course_code']
        return Assignment.objects.filter(course__code=course_code)


class CreateAssignmentView(generics.CreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = CreateAssignmentSerializer
    permission_classes = [IsAuthenticated, IsLecturer]


class UpdateAssignmentStatusView(APIView):
    permission_classes = [IsAuthenticated, IsLecturer]

    def post(self, request, pk):
        assignment = get_object_or_404(Assignment, pk=pk)
        is_pending = request.data.get('is_pending', True)
        
        assignment.is_pending = is_pending
        assignment.save()
        
        return Response({
            'id': assignment.id,
            'title': assignment.title,
            'is_pending': assignment.is_pending,
            'status': 'pending' if assignment.is_pending else 'active'
        }, status=200)


# --------------------
# 📤 SUBMISSIONS
# --------------------

class CreateSubmissionView(generics.CreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = CreateSubmissionSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
        # Optional: trigger auto-grade here


class SubmissionListView(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(student=self.request.user)


class SubmissionListByAssignmentView(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated, IsLecturer]

    def get_queryset(self):
        assignment_id = self.request.query_params.get('assignment')
        return Submission.objects.filter(assignment_id=assignment_id)


class GradeSubmissionView(APIView):
    permission_classes = [IsAuthenticated, IsLecturer]

    def post(self, request, pk):
        use_ai = request.data.get("use_ai", False)
        score = request.data.get("score")
        feedback = request.data.get("feedback")

        submission = get_object_or_404(Submission, pk=pk)

        if submission.is_graded:
            return Response({"detail": "Submission already graded."}, status=status.HTTP_400_BAD_REQUEST)

        if use_ai:
            try:
                code = submission.code_text
                if not code and submission.code_file:
                    code = submission.code_file.read().decode()

                score, feedback = grade_with_gemini(
                    assignment_title=submission.assignment.title,
                    code=code,
                    max_score=submission.assignment.total_marks
                )
            except Exception as e:
                return Response({"error": f"AI grading failed: {str(e)}"}, status=500)

        else:
            if score is None or feedback is None:
                return Response({"error": "Score and feedback required for manual grading."}, status=400)

        submission.score = score
        submission.feedback = feedback
        submission.is_graded = True
        submission.save()

        return Response({
            "score": submission.score,
            "feedback": submission.feedback,
            "graded_by": "AI" if use_ai else "Lecturer"
        }, status=200)
