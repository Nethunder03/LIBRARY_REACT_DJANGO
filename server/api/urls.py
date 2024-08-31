from django.urls import path
from .views import get_books, create_book, book_details, get_users, create_user, user_details

urlpatterns =[
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_books'),
    path('books/<int:pk>/', book_details, name='book_details'),
    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_users'),
   path('users/<int:pk>/', user_details, name='book_details'),
]