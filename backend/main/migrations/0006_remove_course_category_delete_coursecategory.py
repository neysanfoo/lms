# Generated by Django 4.0.4 on 2022-05-24 04:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_rename_featured_image_course_featured_img'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='category',
        ),
        migrations.DeleteModel(
            name='CourseCategory',
        ),
    ]
