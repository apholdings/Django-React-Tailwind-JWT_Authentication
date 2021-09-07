from django.urls import path
from .views import DeleteUserAccountView

urlpatterns = [
    path('delete-account', DeleteUserAccountView.as_view()),
]
