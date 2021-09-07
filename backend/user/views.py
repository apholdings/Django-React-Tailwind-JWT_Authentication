from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()


class DeleteUserAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response(
                {'success': 'Successfully deleted user account'},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Failed to delete user account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
