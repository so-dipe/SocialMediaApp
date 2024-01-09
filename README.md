# SocialMediaApp

This app is the solution to an assessment I was given for a job. While the assessment said I should create a reddit-like app, I took some liberties and but the core of the project remains. You can use the app at this link https://socialmedia-frontend-4s2v.onrender.com/ (temporary)

## Features
Here are some of the features of the app...
- Create accounts without email
- Create posts
- Write comments with no depth
- Like posts

## Installation
The app is divided into two parts, A frontend made with react and a backend made with FastAPI. Both apps have a Dockerfile in their directory. The backend has its Dockerfile in the root directory and the frontend has its Dockerfile in ./frontend

You can also run the app using `uvicorn main:app --reload` and `npm start` when in development or when running locally.

It requires some environment variables for MongoDB and an app secret. Check `./app/config/config.py` for a list of environment variables required for the backend and `./frontend/src/config.js` for the environment variable required for the backend.

Here's how to run with docker
# Backend
Build Image
```
docker build -t socialmedia-backend .
```

Run Image
```
docker run -d -p 8000:8000 --env-file <path-to-env-file> socialmedia-backend
```

# Frontend
```
cd frontend
```
Build Image
```
docker build -t socialmedia-frontend .
```

Run Image
```
docker run -d -e REACT_APP_BASE_URL=<LINK TO BACKEND> -p 3000:3000 socialmedia-frontend
```


