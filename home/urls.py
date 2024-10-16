from django.urls import path
from .views import Login,Home
urlpatterns = [
    path('login', Login.as_view()),
    path('home',Home.as_view()),
]
