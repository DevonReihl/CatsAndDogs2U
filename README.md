# Petful Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#Live: https://petful-client-hjumdgxw3.vercel.app

#Server Repo: https://github.com/DevonReihl/DSA-petful-server

The Petful application resembles an adoption process for cats and dogs. Only you can only adopt the current available cat or dog on as FIFO bases. Along with the animal you are removed from the queue

Technologies: React, Express, Node

Endpoints
GET (/pets): Retrieve cats or dogs in a Queue structure

GET (/people): Retrieve people in a Queue structure

DELETE (/cats): Dequeues cats on a first-in-first-out basis as well as the current first-in first- out person

DELETE (/dogs): Dequeues dogs on a first-in-first-out basis as well as the current first-in first- out person

POST (/people): Enqueues a new person the the people queue 
