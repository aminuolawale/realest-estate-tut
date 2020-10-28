from django.urls import path
from .views import RealtorListView, RealtorView, TopSellerView


urlpatterns = [
    path("", RealtorListView.as_view(), name="realtor_list"),
    path("<pk>/", RealtorView.as_view(), name="realtor_view"),
    path("topseller/", TopSellerView.as_view(), name="topseller_view"),
]
