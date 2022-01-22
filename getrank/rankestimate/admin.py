from django.contrib import admin

from .models import *
# Register your models here.

def getFieldsModel(model):
    return [field.name for field in model._meta.get_fields()]

class MarksAdmin(admin.ModelAdmin):
    list_display = getFieldsModel(Marks)
admin.site.register(Marks, MarksAdmin)

class DomainsAdmin(admin.ModelAdmin):
    list_display = getFieldsModel(Domains)
admin.site.register(Domains, DomainsAdmin)

class MaxRankBucketsAdmin(admin.ModelAdmin):
    list_display = getFieldsModel(MaxRankBuckets)
admin.site.register(MaxRankBuckets, MaxRankBucketsAdmin)