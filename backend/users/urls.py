from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('profiles/', views.get_users, name='get_users'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout, name='logout'),
    path('profiles/create/', views.create_user, name='create_user'),
    path('profiles/<int:pk>/', views.user_details, name='profile-detail'),
    path('profiles/now/', views.get_current_user, name='current_user'),
]
