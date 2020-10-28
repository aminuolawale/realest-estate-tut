from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework import permissions
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from datetime import datetime, timedelta, timezone
from realtors.models import Realtor

class ListingsView(ListAPIView, CreateAPIView):
    queryset = Listing.objects.order_by("-list_date").filter(is_published=True)
    permission_classes = (permissions.AllowAny,)
    lookup_field = "slug"
    serializer_class = ListingSerializer

    def perform_create(self, serializer):
        realtor = Realtor.objects.filter(id=self.request.data.get("realtor")).first()
        serializer.save(realtor=realtor)


class ListingDetailView(RetrieveAPIView):
    queryset = Listing.objects.filter(is_published=True)
    serializer_class = ListingDetailSerializer
    lookup_field = "slug"


class SearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        print("we got here at least")
        queryset = Listing.objects.order_by(
            "-list_date").filter(is_published=True)
        data = self.request.data
        sale_type = data.get("sale_type")
        if sale_type:
            queryset = queryset.filter(sale_type=sale_type)
        price = data.get("price")
        if price:
            if price == "$0+":
                price = 0
            elif price == "$200,000+":
                price = 200000
            elif price == "$400,000+":
                price = 400000
            elif price == "$800,000+":
                price = 800000
            elif price == "$1200,000+":
                price = 1200000
            elif price == "Any":
                price = -1
            if price != -1:
                queryset = queryset.filter(price__gte=price)
        bedrooms = data.get("bedrooms")
        if bedrooms:
            if bedrooms == "0+":
                bedrooms = 0
            elif bedrooms == "1+":
                bedrooms = 0
            elif bedrooms == "2+":
                bedrooms = 0
            elif bedrooms == "3+":
                bedrooms = 0
            elif bedrooms == "4+":
                bedrooms = 0
            elif bedrooms == "5+":
                bedrooms = 0
            queryset = queryset.filter(bedrooms__gte=bedrooms)
        home_type = data.get("home_type")
        if home_type:
            queryset = queryset.filter(home_type__iexact=home_type)
        bathrooms = data.get("bathrooms")
        if bathrooms:
            if bathrooms == "0+":
                bathrooms = 0.0
            elif bathrooms == "1+":
                bathrooms = 0.0
            elif bathrooms == "2+":
                bathrooms = 0.0
            elif bathrooms == "3+":
                bathrooms = 0.0
            elif bathrooms == "4+":
                bathrooms = 0.0
            elif bathrooms == "5+":
                bathrooms = 0.0
            queryset = queryset.filter(bathrooms__gte=bathrooms)
        sqft = data.get("sqft")
        if sqft and sqft!="Any":
            if sqft != 0:
                queryset = queryset.filter(sqft__gte=sqft)
        days_passed = data.get("days_listed")
        if days_passed:
            if days_passed == "1 or less":
                days_passed = 1
            elif days_passed == "2 or less":
                days_passed = 2
            elif days_passed == "5 or less":
                days_passed = 5
            elif days_passed == "10 or less":
                days_passed = 10
            elif days_passed == "20 or less":
                days_passed = 20
            elif days_passed == "Any":
                days_passed = 0

            for query in queryset:
                num_days = (datetime.now(timezone.utc) - query.list_date).days
                if days_passed != 0:
                    if num_days > days_passed:
                        slug = query.slug
                        queryset = queryset.exclude(slug__iexact=slug)
        has_photos = data.get("has_photos")
        if has_photos:
            if has_photos == "1+":
                has_photos = 1
            elif has_photos == "3+":
                has_photos = 3
            elif has_photos == "5+":
                has_photos = 5
            elif has_photos == "10+":
                has_photos = 10
            elif has_photos == "15+":
                has_photos = 15
            else:
                has_photos=0

            for query in queryset:
                count = 0
                for i in range(1, 21):
                    try:
                        p = getattr(query, "photo_{}".format(i))
                    except:
                        p = None
                    if p:
                        count += 1
                if count < has_photos:
                    slug = query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
        open_houses = data.get("open_houses")
        if open_houses:
            queryset = queryset.filter(open_houses__iexact=open_houses)
        keywords = data.get("keywords")
        if keywords:
            queryset = queryset.filter(description__icontains=keywords)
        serializer = ListingSerializer(queryset, many=True)
        print("this is the serializer", serializer)
        return Response(serializer.data)
