from django.db import models

# Create your models here.
class Books(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    pubdate = models.DateField()
    isbn = models.CharField(max_length=13)
    summary = models.CharField(default='')
    gender = models.CharField(max_length=255)
    availability = models.CharField(max_length=4)
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)

    def __str__(self):
        return self.title