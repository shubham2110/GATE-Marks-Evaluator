# Generated by Django 3.0.7 on 2022-01-22 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rankestimate', '0004_domains'),
    ]

    operations = [
        migrations.AddField(
            model_name='domains',
            name='check',
            field=models.BooleanField(default=True),
        ),
    ]