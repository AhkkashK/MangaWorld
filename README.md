# MangaWorld

## Introduction 

Hello world ! As a data engineer student i wanted to upgrade my coding skills in general, i wanted to do a project in relation with a topic that i like and it's mangas.
I scraped a website then i managed to transform and load the data into a local MySQL database. The backend is in ExpressJS and the frontend in ReactJS. The purpose of my website is to propose a manga library where you can search informations about the top 1000 mangas.

## How to run the project

As all the data was stored in a local database you have to create your own database in your computer. Therefore you have to modify all the parameters in the server.js file  (backend folder) and the load.ipynb file (ETL folder) that mention database parameters. 

To get the current top 1000 mangas you have to execute these files in the ETL folder : scraping.py, transform.ipynb, load.ipynb .

Then you have to follow these steps to run the project : 

1. Go to the project
2. In your terminal, go to the backend folder
3. Run this command - `npm run devStart`
4. Open an another terminal
5. Go to the frontend folder
6. Run this command - `npm start`
   
## Preview of the website

https://github.com/AhkkashK/MangaWorld/assets/94615150/24398f78-0eb9-45d4-a267-ec965558f06d


## What I have learned from this (new skills, difficult parts of my project...) ? 

As I mentioned before, this project was aimed at familiarizing myself with the ETL process. Through this project, I learned the construction of APIs and connecting to a MySQL database using ExpressJS. ReactJS was new to me (note that I didn't spend much time on the frontend). Also, one of my biggest struggles was being able to scrape the website without getting blocked. To counter that, I created a pool of free proxies. I have to mention that free proxies die very quickly, making it more challenging. Despite all that, I took great pleasure in building this project in my free time.


## What can be the next step ? 

- Create a user account system (I did not do it because I wanted to focus on other things at this time). Moreover with this user system, I can learn about collaborative filtering for recommendation. In this project, I used cosine similarity, which was not very accurate but provided some nice results.

- Develop a more aesthetically pleasing website with additional features such as the ability to read manga. Unfortunately, I can't implement this because there are no available links.


Don't hesitate to give me some advices, I will be extremely grateful ! 

