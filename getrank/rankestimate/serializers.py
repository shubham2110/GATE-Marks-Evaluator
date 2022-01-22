from rest_framework import serializers
from .models import Marks
from .models import MaxRankBuckets

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = "__all__"

class MaxRankBucketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaxRankBuckets
        fields = "__all__"