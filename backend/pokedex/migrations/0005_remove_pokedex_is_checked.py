# Generated by Django 2.2.7 on 2019-12-02 06:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pokedex', '0004_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pokedex',
            name='is_checked',
        ),
    ]
