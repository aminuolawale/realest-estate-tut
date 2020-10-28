from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status

user_model = get_user_model()


class SignUpView(APIView):
    """ This is the view that facilitates signup"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        password2 = data.get("password2")
        print(password, password2)
        if password == password2:
            if user_model.objects.filter(email=email):
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            if len(password2) < 6:
                return Response({"error": "Password is too short"}, status=status.HTTP_400_BAD_REQUEST)
            user = user_model.objects.create_user(
                name=name, email=email, password=password)
            user.save()
            # return user model serialized?
            return Response({"success": "user created successfully"}, status=status.HTTP_201_CREATED)

        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
