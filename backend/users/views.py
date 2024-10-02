from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer
from .models import CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_admin'] = user.is_admin
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    # Vérifie si l'utilisateur a le droit d'accéder aux données
    if not request.user.is_admin:  # Utilise is_staff si tu veux vérifier le statut d'admin
        return Response({"error": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
    
    # Récupère tous les utilisateurs
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True).data
    return Response(serializer)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_details(request, pk):
    try:
        user = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response({"error": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)

    if not request.user.is_admin and request.user.pk != user.pk:
        return Response({"error": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CustomUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if request.user.is_admin or request.user.pk == user.pk:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'last_name': user.last_name,
        'first_name': user.first_name,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Récupérer le token d'accès depuis l'en-tête Authorization
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Token manquant'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Extraire le token d'accès
        token = auth_header.split(' ')[1]
        
        # Blacklist le token d'accès
        token_obj = RefreshToken(token)
        token_obj.blacklist()
        
        return Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

