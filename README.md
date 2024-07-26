# Roomatch

The easy way to find roomates!</br>
Looking for the perfect roommate? </br>
Discover an effortless way to find your ideal match!✨</br> 
This platform connects you with potential roommates based on shared interests, lifestyle preferences, and location.🔍</br>
Put the doom scrolling to use till you find the one, stress-free roommate matching.👫 </br>

## DEMO
https://github.com/user-attachments/assets/04c27327-a76f-4aeb-b20d-910015372e46

## how to set up
1. Clone the repo then run the following
```
cd frontend
cp sample.env .env
cd ..
cd backend
cp sample.env .env
cd ..
```
Supply the env vars. 
For `frontend` you require [firebase auth](https://firebase.google.com/docs/auth).
For `backend` you require a [Mongodb collection](https://www.mongodb.com/) and an [aws s3 bucket](https://aws.amazon.com/s3/).

Finaly run
```
docker compose up
```

## TECH STACK
- Vue3
- mongoDb
- Node.js
- AWS S3
- Github Actions
- Firebase Auth
- Docker 
