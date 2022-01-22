from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings

app_name='rankestimate'

urlpatterns = [
    path('marks', views.MarksAPIView.as_view()),
    path('marks/<str:pk>', views.MarksAPIView.as_view()), # to capture our ids
    path('rank', views.EstimateRank.as_view()),
]
