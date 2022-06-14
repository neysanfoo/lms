from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CourseSerializer, ChapterSerializer, StudentSerializer,StudentCourseEnrollSerializer, CourseRatingSerializer, TeacherDashboardSerializer
from . import models
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

class TeacherList(generics.ListCreateAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer
    # permission_classes=[permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

@csrf_exempt
def teacher_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        teacherData=models.Teacher.objects.get(email=email,password=password)
    except:
        teacherData=None
    if teacherData:
        return JsonResponse({'bool':True, 'teacherId':teacherData.id})
    else:
        return JsonResponse({'bool':False})

class CourseList(generics.ListCreateAPIView):
    queryset=models.Course.objects.all().order_by('-id')
    serializer_class=CourseSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=models.Course.objects.all().order_by('-id')[:limit]
        return qs

# Specific Teacher Course
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class=CourseSerializer
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=CourseSerializer
    queryset=models.Course.objects.all()


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    # def get_queryset(self):
    #     chapter_id=self.kwargs['chapter_id']
    #     return models.Chapter.objects.filter(pk=chapter_id)

class CourseChapterList(generics.ListCreateAPIView):
    serializer_class=ChapterSerializer
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class CourseDetailView(generics.RetrieveAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer

class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer
    # permission_classes=[permissions.IsAuthenticated]

@csrf_exempt
def student_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        studentData=models.Student.objects.get(email=email,password=password)
    except:
        studentData=None
    if studentData:
        return JsonResponse({'bool':True, 'studentId':studentData.id})
    else:
        return JsonResponse({'bool':False})

class StudentEnrolledCourseList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

@csrf_exempt
def student_enroll_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course, student=student)
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


class EnrolledStudentList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()

class CourseRatingList(generics.ListCreateAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=CourseRatingSerializer

@csrf_exempt
def fetch_rating_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course, student=student)
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

@csrf_exempt
def teacher_change_password(request, teacher_id):
    password=request.POST['password']
    try:
        teacherData=models.Teacher.objects.get(id=teacher_id)
    except:
        teacherData=None
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})