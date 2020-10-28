from django.urls import path
from .views import ListingsView, ListingDetailView, SearchView

urlpatterns = [
    path("", ListingsView.as_view(), name="listings"),
    path("search/", SearchView.as_view(), name="search"),
    path("<slug>/", ListingDetailView.as_view(), name="listing_detail"),

]
