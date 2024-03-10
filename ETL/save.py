#version que j'avais fait sans aide 
import requests 
from bs4 import BeautifulSoup
import json 
import time 
import random
from prox import getproxies
import yaml


def get_all_pages_top_mangas(): #  retourne une liste comportant toutes les urls des top pages
    pages = []
    url = "https://myanimelist.net/topmanga.php?type=manga&limit="
    for i in range (0,1000,50): 
        page = url+str(i)
        pages.append(page)
    return pages 

def get_manga_detail(url,proxie,headers): # retourne un dictionnaire comportant toutes les données d'un mangas
    attributes = ['Types','Volumes','Chapters','Status','Published','Genres',
                  'Themes','Demographic','Serialization','Authors','Score','Ranked'
                  ,'Popularity','Members','Favorites']
    
    r = requests.get(url,proxies=proxie,headers=headers,timeout=7)
    soup  = BeautifulSoup(r.content,"html.parser")
    manga_detail = {}
    manga_detail['Title'] = soup.find('span',itemprop='name').contents[0].text
    if soup.find('span',itemprop='description') is None:
        manga_detail['Description'] = 'None'
    else:
        manga_detail['Description'] = soup.find('span',itemprop='description').text.split('[Written by MAL Rewrite]',1)[0]
    allspace = soup.find_all('div',class_='spaceit_pad')
    for space in allspace:
        for i in range(len(attributes)):          
            if attributes[i] in space.text :
                if attributes[i]=='Genres':
                    genres = []
                    allgenre =space.find_all('span',itemprop='genre')
                    for genre in allgenre:
                        genres.append(genre.text)
                    manga_detail[attributes[i]]=genres
                elif attributes[i]=='Themes':
                    themes=[]
                    allthemes = space.find_all('span',itemprop='genre')
                    for theme in allthemes:
                        themes.append(theme.text)
                    manga_detail[attributes[i]]=themes
                elif attributes[i]=='Demographic':
                    demographic=[]
                    alldemographic = space.find_all('span',itemprop='genre')
                    for demo in alldemographic:
                        demographic.append(demo.text)
                    manga_detail[attributes[i]]=demographic
                
                elif attributes[i] == 'Score':
                    manga_detail[attributes[i]] =space.find('span',itemprop='ratingValue').text
                
                elif attributes[i] == 'Ranked':
                    manga_detail[attributes[i]] = space.contents[2].strip(' #')  # contents permet d'avoir une liste des enfants 
                
                elif attributes[i] == 'Popularity':
                    manga_detail[attributes[i]] = space.text.split('Popularity: #',1)[1] 
                else:
                    manga_detail[attributes[i]] = space.text.strip(attributes[i]+': ').strip('\n')
            else:
                pass
    
    return manga_detail


def allpages(url): # prend tous les url des 50 mangas de la page
    r = requests.get(url)
    soup = BeautifulSoup(r.content,"html.parser")
    mangas = soup.find_all('a',class_='hoverinfo_trigger fl-l ml12 mr8')
    main_pages=[]
    for manga in mangas:
        main_pages.append(manga.get('href'))  #manga ici est de type bs4.tag, get: retourne la valeur du paramètre  
    
    return  main_pages


#def scraper():
    # Prendre les urls de toutes les pages :
    prox,headers = getproxies()
    proxies=list(prox)
    while (len(proxies)==0):
        prox,headers = getproxies()
        proxies=list(prox)
    data = []
    i = 0
    print("Les proxies : ", proxies)
    manga_links = []
    all_top_pages = get_all_pages_top_mangas()
    print("Extraction des pages")
    for top_page in all_top_pages:
        manga_links.extend(allpages(top_page))
    print("Extraction des pages terminées")
    for manga in manga_links:
        bol = False
        while bol ==False:
            
            randomprox = random.choice(proxies)
            print("randomprox: ", randomprox)
            try:
                proxie = {"http":randomprox,"https":randomprox}
                manga_data = get_manga_detail(manga,proxie,headers)
                data.append(manga_data)
                print(i+1," : ",data[i]['Title'], proxie)
                i= i+1
                time.sleep(random.randint(0, 8))
                bol = True 
            except:
                proxies.remove(randomprox)
                if len(proxies) == 0:
                    proxies.extend(getproxies())
                print("Failed")
        
    return data



        
   
    
def scraper():
    # Prendre les urls de toutes les pages :
    with open("headers.yml") as f_headers:
        headers = yaml.safe_load(f_headers)
    
    data = []
    i = 0
    manga_links = []
    all_top_pages = get_all_pages_top_mangas()
    print("Extraction des pages")
    for top_page in all_top_pages:
        manga_links.extend(allpages(top_page))
    print("Extraction des pages terminées")
    proxies = list(getproxies())
    print(proxies)
    for manga in manga_links:
        if i !=0 and i%200 == 0:
            print("Pause de 2 min")
            time.sleep(120)
            
            proxies = list(getproxies())
        
        bol = False
        while bol ==False:
            prox = random.choice(proxies)
            proxie = {
                'http':prox,'https':prox
            }
            header = random.choice(list(headers.keys()))
            try:
                manga_data = get_manga_detail(manga,proxie,headers[header])
                
                data.append(manga_data)
                print(i+1," : ",data[i]['Title'],proxie,header)
                i= i+1
                #time.sleep(random.randint(1,5))
                bol = True 
            except:
                print("Failed : ")
                pass
    return data


data = scraper()
with open('data.json', 'w') as json_file:
    json.dump(data, json_file, indent=2)


