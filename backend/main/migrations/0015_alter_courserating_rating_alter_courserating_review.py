# Generated by Django 4.0.4 on 2022-06-09 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_courserating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courserating',
            name='rating',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='courserating',
            name='review',
            field=models.TextField(null=True),
        ),
    ]
