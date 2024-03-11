# MangaWorld

## Introduction 

Hello world ! To upgrade my coding skills in general, i wanted to do a project in relatation with a topic that i like and it's mangas.
I scraped a website then i managed to transform and load the data into a local MySQL database. The backend is in ExpressJS and the frontend in ReactJS. The purpose of my website was to be a manga library where you can search informations about the top 1000 mangas.

## How to run the project

As all the data was stored in a local database you have to create your own database in your computer. Therefore you have to modify all the parameters in the server.js file  (backend folder) and the load.ipynb file (ETL folder) that mention database parameters. 

To get the current top 1000 mangas you have to execute these files in the ETL folder : scraping.py, transform.ipynb, load.ipynb .

Then you have to follow these steps to run the project : 

1. Go to the project
2. In your terminal, go to the backend folder
3. run this command - `npm run devStart`
4. Open a another terminal
5. Go the frontend folder
6. run this command - `npm start`
   

