import requests
import yaml


def list_of_proxys():
    api_url = 'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all'

    params = {
        'protocol': 'http',
        'anonymity': 'elite',
        'country': ['US','CA']
        
    }
    try:
        response = requests.get(api_url,params=params)
        if response.status_code == 200:
            https_proxies = response.text.split('\r\n')
            #print(f"List of proxies: {https_proxies}")
        else:
            print(f"Failed to fetch proxies with status code {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

    return https_proxies

def verif(https_proxies):
    with open("headers.yml") as f_headers:
        browser_headers = yaml.safe_load(f_headers)
            #print(browser_headers)  
        good_proxies = set()


    headers = browser_headers["Chrome"]
    url = "https://httpbin.org/ip"    
    for proxy_url in https_proxies:
        proxies = {
            "http": proxy_url,
            "https": proxy_url,
        }
        try:
            response = requests.get(url, proxies=proxies, headers=headers, timeout=2)
            if response.status_code == 200:
                good_proxies.add(proxy_url)
        except Exception as e:
            pass
    print(len(good_proxies),"longueur good proxies")
    return good_proxies

def veriff(https_proxies):
    with open("headers.yml") as f_headers:
        browser_headers = yaml.safe_load(f_headers)
        good_proxies = set()

    headers = browser_headers["Chrome"]
    url = "https://myanimelist.net/topmanga.php?type=manga" 
    https_proxies.remove('') 
    print("httpsprox : ",https_proxies )  
    

    for proxy_url in https_proxies:
        proxies = {
            "http": proxy_url,
            "https": proxy_url,
        }

        try:
            
            response = requests.get(url, proxies=proxies, headers=headers, timeout=2)
            if response.status_code == 200:
                good_proxies.add(proxy_url)
                print("add : ",proxy_url)
        except Exception as e:
            pass

    print(len(good_proxies), "longeur good proxies")
    return good_proxies


def getproxies():
    max = 0
    good = []
    while (len(good)==0  and max !=3 ):
        https_proxies = list_of_proxys()
        sample = https_proxies
        good = veriff(sample)
        max = max +1
    
    if max == 3 :
        print("not enough prox")
    
    return good
