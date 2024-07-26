# Roomatch
This project allows people to easily find roomates by Connecting you with potential roommates based on shared interests, lifestyle preferences, and location.🔍
Put the doom scrolling to use and find a decent roommate for your upcoming semester.👫 </br>

## Table of Contents
- [Features](https://github.com/preetgami/roomatch/blob/main/README.md#features)
- [Demo](https://github.com/preetgami/roomatch/blob/main/README.md#demo)
- [Getting Started using docker](https://github.com/preetgami/roomatch/blob/main/README.md#getting-started)
- [Tech stack](https://github.com/preetgami/roomatch/blob/main/README.md#tech-stack)

## Features
- Use AWS S3 for secure profile management and image storage.
- Recommendation System: Implement a preference-based engine to deliver personalized suggestions.
- Match Interaction: Facilitate seamless viewing and connection with potential matches.
- Secure Authentication: Employ Firebase Authentication for robust and secure user sign-up and login.
## Demo
https://github.com/user-attachments/assets/04c27327-a76f-4aeb-b20d-910015372e46

## Getting Started
### Set up
Thanks to docker this is simple:

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
3. Supply the env vars. 
  - For `frontend` you require [firebase auth](https://firebase.google.com/docs/auth) .
  - For `backend` you require a [Mongodb collection](https://www.mongodb.com/) and an [aws s3 bucket](https://aws.amazon.com/s3/) .
4. Finaly run
```
docker compose up
```

## Tech stack
- Vue3
- mongoDb
- Node.js
- AWS S3
- Github Actions
- Firebase Auth
- Docker 
