from django.contrib import admin
from .models import Realtor
# list_display list_display_links search_fields list_per_page


class RealtorAdmin(admin.ModelAdmin):
    """ """
    list_display = ("id", "name", "email", "date_hired")
    list_display_links = ("id", "name",)
    search_fields = ("name",)
    list_per_page = 25


admin.site.register(Realtor, RealtorAdmin)
