from django.contrib import admin

from implovit.models import *

# Register your models here.


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    list_per_page = 20
    search_fields = ('title',)
    list_filter = ['title']


@admin.register(Medicines)
class MedicinesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'tag', 'created_at', 'updated_at')
    list_display_links = ('id', 'title')
    list_per_page = 20
    search_fields = ['title', 'tag']


@admin.register(ProductImages)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'caption')
    list_display_links = ('id', '__str__', 'caption')
    list_per_page = 20
    search_fields = ('__str__', 'caption')


@admin.register(ProductTags)
class ProductTagsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    list_per_page = 20
    search_fields = ('name', )
