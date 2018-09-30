import  requests
import random
import sys
from bson.json_util import dumps
from bs4 import BeautifulSoup
from mongoengine import *

#start page
page_count = 1
#base url for getting list of recipes
url_list_recipes = "https://www.epicurious.com/search/?special-consideration=quick-and-easy&page="
#base url for one recipe
url_get_recipe = "https://www.epicurious.com"

connect('recipe_db')

#Complete recipe model
class RecipeFull(Document):
    name = StringField(required=True)
    description = StringField(required=True)
    ingredients = ListField(StringField())
    steps = ListField(StringField())
    
#Basic recipe model
class RecipeBasic(Document):
    name = StringField(required=True)
    link = StringField(required=True)

#function to scrape list of recipes
def scrape_url(page_count):
    #get the specific page with listed recipes
    page = requests.get(url_list_recipes+str(page_count))
    #if page exists
    if page.status_code==200 :
        #parse the page
        soup = BeautifulSoup(page.content,'html.parser')
        #get the recipe html
        all_content_cards = soup.find_all(class_='recipe-content-card')
        for content_card in all_content_cards:

            try:
                recipe_header = content_card.select('h4')[0]
                #get the recipe link
                recipe_link = recipe_header.select('a')[0]['href']
                #get the recipe name
                recipe_name = recipe_header.text
                print(recipe_name)
                #store this simple info in a separate db to facilitate searching later on
                if recipe_name and recipe_link:
                    recipe = RecipeBasic(name=recipe_name,link=recipe_link)
                    #scrape the actual recipe
                    scrape_recipe(recipe_link)
            except Exception as e:
                print(e)
    else:
        #exit the program if page get fails
        sys.exit()
    #increment the page counter
    page_count += 1
    #supply the page counter to get the next set of recipes
    scrape_url(page_count)

#function to scrape the actual recipe
def scrape_recipe(recipe_url):
    page = requests.get(url_get_recipe + recipe_url)
    ingredient_list = []
    step_list = []
    if page.status_code == 200 :
        soup = BeautifulSoup(page.content,'html.parser')
        #name of recipe

        try:
            recipe_name_node = soup.find('h1')

            if recipe_name_node:
                recipe_name = recipe_name_node.text 
            #desc of recipe
            recipe_description_node = soup.find(class_ = 'dek')

            if recipe_description_node:
                recipe_description = recipe_description_node.text

            #list of ingredients
            recipe_ingredients_list = soup.find_all(class_ = 'ingredient')

            for ingredient in recipe_ingredients_list:
                ingredient_list.append(ingredient.text.strip())
            #list of steps
            recipe_steps_list = soup.find_all(class_ = 'preparation-step')
            for step in recipe_steps_list:
                step_list.append(step.text.strip())
                
            #make the recipe object
            if recipe_name and recipe_description:
                recipe = RecipeFull(name=recipe_name,description=recipe_description,ingredients=ingredient_list,steps=step_list).save()
        except Exception as e:
            print(e)

#start the scraping process
scrape_url(page_count)
        
        