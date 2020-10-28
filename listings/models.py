from django.db import models
from django.utils.timezone import now
from realtors.models import Realtor


class Listing(models.Model):
    """ this is the listing model"""
    class SaleType(models.TextChoices):
        FOR_SALE = "For Sale"
        FOR_RENT = "For Rent"

    class HomeType(models.TextChoices):
        HOUSE = "House"
        CONDO = "Condo"
        TOWNHOUSE = "Townhouse"
    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=20)
    description = models.TextField()
    sale_type = models.CharField(
        max_length=40, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.FloatField()
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(
        max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
    sqft = models.IntegerField()
    open_houses = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to="photos/%Y/%m/%d")
    photo_1 = models.ImageField(upload_to="photos/%Y/%m/%d")
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return self.title
