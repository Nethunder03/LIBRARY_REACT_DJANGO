from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_books, name='get_books'),
    path('create/', views.create_book, name='create_book'),
    path('<int:pk>/', views.book_details, name='book_details'),
]
