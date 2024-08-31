from django.db import models


class Books(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    pubdate = models.DateField()
    isbn = models.CharField(max_length=13)
    gender = models.CharField(max_length=255)
    availability = models.CharField(max_length=4)
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)

    def __str__(self):
        return self.title


class Loans(models.Model):
    book = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    loansdate = models.DateField()
    backdate = models.DateField()

    def __str__(self):
        return self.book
    

class Users(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=25)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name
    
