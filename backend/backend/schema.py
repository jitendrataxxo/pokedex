from graphene import Schema
from pokedex.models import Pokedex, Category
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType
from graphene.relay import Node


class PokedexNode(DjangoObjectType):

    class Meta:
        model = Pokedex
        interfaces = (Node,)
        filter_fields = {
            'id': ['exact'],
            'name': ['icontains'],
        }


class CategoryNode(DjangoObjectType):

    class Meta:
        model = Category
        interfaces = (Node,)
        filter_fields = {
            'id': ['exact'],
            'name': ['icontains'],
        }


class Query(ObjectType):
    pokemon = Node.Field(PokedexNode)
    all_pokemons = DjangoFilterConnectionField(PokedexNode)
    category = Node.Field(CategoryNode)
    all_categories = DjangoFilterConnectionField(CategoryNode)


schema = Schema(query=Query)
