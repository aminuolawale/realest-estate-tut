from rest_framework import permissions
from rest_framework.views import APIView
from .models import Contact
from django.core.mail import send_mail
from rest_framework.response import Response
from .serializers import ContactSerializer


class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ContactSerializer

    def post(self, request, format=None):
        data = self.request.data
        subject = data.get("subject")
        message = "Name: {} \nEmail: {}\n\nMessage:\n{}".format(
            data.get("name"), data.get("email"), data.get("message"))
        try:
            send_mail(subject, message, "aminuolawaleji@gmail.com",
                      ["aminuolawaleji@gmail.com"], fail_silently=False)

            contact = Contact(name=data.get("name"), email=data.get(
                "email"), subject=data.get("subject"), message=data.get("message"))
            contact.save()
            contact_data = ContactSerializer(contact)
            return Response({"success": "Message Sent successfully", "data": contact_data.data})
        except:
            return Response({"error": "Message failed to send"})
