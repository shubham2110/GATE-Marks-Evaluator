from django.db import models

# Create your models here.

class Domains(models.Model):
    validdomain=models.CharField(max_length=100, primary_key=True)
    check=models.BooleanField(default=True)


class MaxRankBuckets(models.Model):
    branch=models.CharField(max_length=5, primary_key=True)
    bucket95_max_rank=models.IntegerField(default=0)
    bucket90_max_rank=models.IntegerField(default=0)
    bucket85_max_rank=models.IntegerField(default=0)
    bucket80_max_rank=models.IntegerField(default=0)
    bucket75_max_rank=models.IntegerField(default=0)
    bucket70_max_rank=models.IntegerField(default=0)
    bucket65_max_rank=models.IntegerField(default=0)
    bucket60_max_rank=models.IntegerField(default=0)
    bucket55_max_rank=models.IntegerField(default=0)
    bucket50_max_rank=models.IntegerField(default=0)
    bucket45_max_rank=models.IntegerField(default=0)
    bucket40_max_rank=models.IntegerField(default=0)
    bucket35_max_rank=models.IntegerField(default=0)
    bucket30_max_rank=models.IntegerField(default=0)
    bucket25_max_rank=models.IntegerField(default=0)
    bucket20_max_rank=models.IntegerField(default=0)
    bucket15_max_rank=models.IntegerField(default=0)



class Marks(models.Model):
    sheeturl=models.CharField(max_length=100, null=False, primary_key=True)
    branch = models.CharField(max_length=5, null=False)
    set = models.CharField(max_length=2, null=False) 
    marks= models.FloatField()
    year=models.CharField(max_length=10, default='2021')

    def __str__(self):
        return str(self.sheeturl)

    def __unicode__(self):
        return 
