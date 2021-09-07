from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', )
    list_display_links = ('id', 'first_name', 'last_name', 'email', )
    search_fields = ('first_name', 'last_name', 'email', )
    list_per_page = 25


admin.site.register(User, UserAdmin)
