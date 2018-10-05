# recipe-suggester-app

## Description
This app is designed to provide easy access to recipes based on ingredients that you have with you.

It will also create shopping lists for if you're running out of important ingredients

## Techstack

* Scraper (python)
* Database (MongoDB)
* Server (NodeJS)
* UI (React)
* Testing (Mocha)

## Steps to get started

* To run the scraper:
  * Run `pip install -r requirements.txt`
  * Run `python scraper.py`
* To run the app:
  * Ensure a mongodb service is running using `mongod`
  * From inside the `Server` directory, run `npm install`
  * Run `npm start` to start the server
* To run the tests:
  * Run `npm test` from the `Server` directory  
