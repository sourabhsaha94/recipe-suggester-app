import  requests
from bs4 import BeautifulSoup

page = requests.get("https://www.allrecipes.com/recipe/228293/curry-stand-chicken-tikka-masala-sauce/")

if(page.status_code==200):
    soup = BeautifulSoup(page.content,'html.parser')
    print soup.prettify()
