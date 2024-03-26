import requests
#from requests.adapters import HTTPAdapter

from bs4 import BeautifulSoup
import json
import time
import random
from prox import getproxies
import yaml
from concurrent.futures import ThreadPoolExecutor

REQUEST_LIMIT = 200



def get_all_pages_top_mangas(start,stop):
    pages = []
    url = "https://myanimelist.net/topmanga.php?type=manga&limit="
    for i in range(start, stop, 50):
        page = url + str(i)
        pages.append(page)
    return pages

def get_manga_detail(url, proxie, headers):
    attributes = ['Types','Volumes','Chapters','Status','Published','Genre',
                  'Theme','Demographic','Serialization','Authors','Score','Ranked'
                  ,'Popularity','Members','Favorites']
    
    r = requests.get(url,proxies=proxie,headers=headers,timeout=7)
    soup  = BeautifulSoup(r.content,"html.parser")
    manga_detail = {}
    manga_detail['Id'] = url.lstrip('https://cdn.myanimelist.net/images/').split('/')[0] 
    manga_detail['Title'] = soup.find('span',itemprop='name').contents[0].text
    if soup.find('span',itemprop='description') is None:
        manga_detail['Description'] = 'None'
    else:
        manga_detail['Description'] = soup.find('span',itemprop='description').text.split('[Written by MAL Rewrite]',1)[0]
    allspace = soup.find_all('div',class_='spaceit_pad')
    for space in allspace:
        if "Synonyms:" in space.text or "English:" in space.text:
            pass
        else:
            for i in range(len(attributes)):          
                if attributes[i] in space.text :
                    if attributes[i]=='Genre':
                        genres = []
                        allgenre =space.find_all('span',itemprop='genre')
                        for genre in allgenre:
                            genres.append(genre.text)
                        manga_detail[attributes[i]]=genres
                    elif attributes[i]=='Theme':
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
    manga_detail['image_url'] = soup.find('div',class_='leftside').find('img').get('data-src')

    
  
        
    return manga_detail

def allpages(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    mangas = soup.find_all('a', class_='hoverinfo_trigger fl-l ml12 mr8')
    main_pages = []
    for manga in mangas:
        main_pages.append(manga.get('href'))
    return main_pages

def scrape_manga(manga,proxies, headers, request_count):
    bol = False
    while not bol:
        prox = random.choice(proxies)
        proxie = {'http': prox, 'https': prox}
        header = random.choice(list(headers.keys()))
        try:
            manga_data = get_manga_detail(manga, proxie, headers[header])
            print(f"Scraped: {manga_data['Title']} {proxie} {header}")
            return manga_data
        except requests.RequestException as e:
            print(f"Request failed: {e}")

    # Increment request count
    request_count[0] += 1

    # Refresh proxies after every 200 requests
    if request_count[0] % REQUEST_LIMIT == 0:
        print(f"Refreshing proxies after {request_count[0]} requests")
        proxies = list(getproxies())

    return manga_data

def scraper(start,stop):
    with open("headers.yml") as f_headers:
        headers = yaml.safe_load(f_headers)

    data = []
    manga_links = []
    all_top_pages = get_all_pages_top_mangas(start,stop)
    print("Extraction des pages")
    with ThreadPoolExecutor() as executor:
        manga_links = executor.map(lambda page: allpages(page), all_top_pages)
        manga_links = [manga for sublist in manga_links for manga in sublist]

    print("Extraction des pages terminées")
    proxies = list(getproxies())
    print(proxies)

    request_count = [0]  # Mutable object to pass by reference

    with ThreadPoolExecutor() as executor:
        futures = [
            executor.submit(scrape_manga, manga,proxies, headers, request_count)
            for manga in manga_links
        ]

        for future in futures:
            manga_data = future.result()
            if manga_data:
                data.append(manga_data)

    # Write data to JSON file
    
    with open(f'data{stop}.json', 'w', encoding="utf-8") as json_file:
        json.dump(data, json_file, indent=2,ensure_ascii=False)


def main():
    print("Scrap jusqu'à 200")
    scraper(0,200)
    print("Scrap terminée, pause 2 min")
    time.sleep(120)
    print("Scrap jusqu'à 400")
    scraper(200,400)
    print("Scrap terminée, pause 2 min")
    time.sleep(120)
    print("Scrap jusqu'à 600")
    scraper(400,600)
    print("Scrap terminée, pause 2 min")
    time.sleep(120)
    print("Scrap jusqu'à 800")
    scraper(600,800)
    print("Scrap terminée, pause 2 min")
    time.sleep(120)
    print("Scrap jusqu'à 1000")
    scraper(800,1000)
    print("Scrap terminée")

main()
