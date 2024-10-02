from rest_framework import serializers
from .models import Loans

class LoansSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loans
        fields = ['id', 'book', 'user', 'loan_date', 'return_date']