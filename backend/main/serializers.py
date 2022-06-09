from rest_framework import serializers
from .models import Teacher, Course, Chapter, Student, StudentCourseEnrollment, CourseRating

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=("id", "full_name","email","password","qualification","mobile_no","bio", "teacher_courses")
    def __init__(self, *arg, **kwargs):
        super(TeacherSerializer, self).__init__(*arg, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=("id","teacher","title","description","featured_img","keywords","course_chapters", "total_enrolled_students", "course_rating")
    def __init__(self, *arg, **kwargs):
        super(CourseSerializer, self).__init__(*arg, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Chapter
        fields=("id","course","title","description","video","remarks")
    def __init__(self, *arg, **kwargs):
        super(ChapterSerializer, self).__init__(*arg, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=("id", "full_name","email","username","password","interests")
        depth=1

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentCourseEnrollment
        fields=("id", "course","student",'enrolled_time')
    def __init__(self, *arg, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*arg, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseRating
        fields=("id", "course","student", "rating", "review", "review_time")
    
    def __init__(self, *arg, **kwargs):
        super(CourseRatingSerializer, self).__init__(*arg, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1