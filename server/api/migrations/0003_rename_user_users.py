# Generated by Django 5.0.6 on 2024-08-31 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_delete_admin_delete_users_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Users',
        ),
    ]
