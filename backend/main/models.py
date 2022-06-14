from django.db import models

# Teacher model
class Teacher(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100, blank=True, null=True)
    qualification=models.CharField(max_length=200)
    mobile_no=models.CharField(max_length=20)
    bio=models.TextField()
    profile_pic=models.ImageField(upload_to='teacher_profile_images/', null=True)


# Course model
class Course(models.Model):
    teacher=models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title=models.CharField(max_length=150)
    description=models.TextField()
    featured_img=models.ImageField(upload_to='course_images/', null=True)
    keywords=models.TextField(null=True)

    def total_enrolled_students(self):
        student_count = StudentCourseEnrollment.objects.filter(course=self).count()
        return student_count
    
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
        
    def __str__(self):
        return self.title

# Student model
class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    username=models.CharField(max_length=100,null=True)
    password=models.CharField(max_length=100)
    interests=models.TextField()

    def __str__(self):
        return self.full_name

# Chapter model
class Chapter(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title=models.CharField(max_length=150)
    description=models.TextField()
    video=models.FileField(upload_to='chapter_videos/', null=True)
    remarks=models.TextField(null=True)

    def chapter_duration(self):
        seconds=0
        import cv2
        cap = cv2.VideoCapture(self.video.path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if frame_count:
            duration = frame_count / fps
            print('fps = ' + str(fps))
            print('number of frames = ' + str(frame_count))
            print('duration = ' + str(duration))
            minutes = int(duration / 60)
            seconds = int(duration % 60)
            print('duration (M:S) = ' + str(minutes) + ':' + str(seconds))
        return seconds

# Student Course Enrollment
class StudentCourseEnrollment(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrolled_courses")
    student=models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrolled_students")
    enrolled_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.course}-{self.student}'

# Course Rating and Review
class CourseRating(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE)
    student=models.ForeignKey(Student, on_delete=models.CASCADE)
    rating=models.PositiveBigIntegerField(default=0)
    review=models.TextField(null=True)
    review_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.course}-{self.student}-{self.rating}'