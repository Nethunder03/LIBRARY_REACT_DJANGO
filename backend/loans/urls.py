from django.urls import path
from .views import get_loans, create_loan, loan_details
urlpatterns = [
    path('', get_loans, name='loan-list'),
    path('create/', create_loan, name='loan-create'),
    path('<int:pk>/', loan_details, name='loan-retrieve-update-destroy'),
]