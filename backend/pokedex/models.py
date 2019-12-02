from django.db import models

# Create your models here.


class Pokedex(models.Model):
    abilities = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    ThumbnailAltText = models.CharField(max_length=50, blank=True, null=True)
    weakness = models.CharField(max_length=50, blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    collectibles_slug = models.CharField(max_length=50, blank=True, null=True)
    featured = models.BooleanField(default=True)
    # Exrtra filed added for selecting a item from this list
    is_checked = models.BooleanField(default=False)
    ThumbnailImage = models.CharField(max_length=1000, blank=True, null=True)
    threat_type = models.CharField(max_length=100, blank=True, null=True)
    slug = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.name)


class Category(models.Model):
    name = models.CharField(max_length=100)
    pokemones = models.ManyToManyField(Pokedex)

    def __str__(self):
        return str(self.name)
