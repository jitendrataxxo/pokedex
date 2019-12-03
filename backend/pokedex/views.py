from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from graphql_relay.node.node import from_global_id
import json
from django.utils import six
from pokedex.models import Category, Pokedex


# Create your views here.

def get_category(id):
    try:
       return Category.objects.get(pk=from_global_id(id)[1])
    except:
        return HttpResponseNotFound('Categary Not Found')


def get_pokemon(id):
    try:
       return Pokedex.objects.get(pk=from_global_id(id)[1])
    except:
        return HttpResponseNotFound('Pokemones Not Found')


def add_category(request):
    data = json.loads(request.body.decode('utf-8'))
    category = data['category']
    pokemons = data['selectedPokemons']
    message = ''
    if category['isNewCAtegory']:
        message = 'Created'
        new_category = Category.objects.create(name=category['value'])
    else:
        message = 'Updeted'
        new_category = get_category(category['value'])
    
    for pokemon in pokemons:
        if get_pokemon(pokemon['node']['id']) not in new_category.pokemones.all():
            new_category.pokemones.add(from_global_id(pokemon['node']['id'])[1])
    return JsonResponse({'category': new_category.name, 'key': new_category.id, 'message': message })


def delete_category(request):
    data = json.loads(request.body.decode('utf-8'))
    category = data['categoryId']
    category = get_category(category)
    data = {'category': category.name}
    category.delete()

    return JsonResponse(data)
