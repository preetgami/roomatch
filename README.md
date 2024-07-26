# Roomatch
This project allows people to easily find roomates by Connecting you with potential roommates based on shared interests, lifestyle preferences, and location.🔍
Put the doom scrolling to use and find a decent roommate for your upcoming semester.👫 </br>

## DEMO
https://github.com/user-attachments/assets/04c27327-a76f-4aeb-b20d-910015372e46

## how to set up
1. Clone the repo
```
git clone https://github.com/preetgami/roomatch
cd roomatch
```
2. Run the following
```
cd frontend
cp sample.env .env
cd ..
cd backend
cp sample.env .env
cd ..
```
3.. Supply the env vars. 
For `frontend` you require [firebase auth](https://firebase.google.com/docs/auth).
For `backend` you require a [Mongodb collection](https://www.mongodb.com/) and an [aws s3 bucket](https://aws.amazon.com/s3/).

4. Finaly run
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
