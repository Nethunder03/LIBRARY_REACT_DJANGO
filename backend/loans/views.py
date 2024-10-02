from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import Loans
from .serializers import LoansSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Create your views here.

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_loans(request):
    loans = Loans.objects.filter(user=request.user)
    serialized_data = LoansSerializer(loans, many=True).data
    return Response(serialized_data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_loan(request):
    data = request.data
    serializer = LoansSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET', 'PUT', 'DELETE'])
def loan_details(request, pk):
    loan = get_object_or_404(Loans, pk=pk, user=request.user)

    if request.method == 'GET':
        serializer = LoansSerializer(loan)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = LoansSerializer(loan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        loan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
