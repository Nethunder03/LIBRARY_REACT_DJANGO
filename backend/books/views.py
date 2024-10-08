from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Books
from .serializers import BookSerializer
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def get_books(request):
    books = Books.objects.all()
    serializedData = BookSerializer(books, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_book(request):
    data = request.data
    serialiser = BookSerializer(data=data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=status.HTTP_201_CREATED)
    return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def book_details(request, pk):
    try:
        book = Books.objects.get(pk=pk)
    except Books.DoesNotExist:
        return Response({"error": "Livre non trouvé"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
