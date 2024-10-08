# Generated by Django 5.0.6 on 2024-09-15 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="groups",
        ),
        migrations.RemoveField(
            model_name="customuser",
            name="is_superuser",
        ),
        migrations.RemoveField(
            model_name="customuser",
            name="user_permissions",
        ),
        migrations.AddField(
            model_name="customuser",
            name="is_admin",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="first_name",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="last_name",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="password",
            field=models.CharField(max_length=128, verbose_name="password"),
        ),
    ]
