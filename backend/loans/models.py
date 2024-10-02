from django.db import models
from django.conf import settings
from books.models import Books
from django.utils import timezone

class Loans(models.Model):
    book = models.ForeignKey(Books, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    loan_date = models.DateTimeField(default=timezone.now)  # Valeur par défaut ici
    return_date = models.DateTimeField(null=True, blank=True)
    STATUS_CHOICES = [
        ('ongoing', 'En cours'),
        ('returned', 'Retourné'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ongoing')

    def __str__(self):
        return f'{self.book.title} - {self.user.username}'
