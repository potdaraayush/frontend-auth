# Frontend Auth + Dashboard

A frontend-focused web application with authentication, protected dashboard, and CRUD functionality, backed by a minimal API.

This is built as part of a frontend developer intern assignment.

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- Framer Motion 

### Backend
- Node.js
- Express
- MongoDB
- JWT auth
- bcrypt

## Features
- user signup and login
- JWT based authentication
- protected dashboard routes
- profile display
- CRUD
- search and filter tasks

## Setup Steps
### Clone the repo
```bash
git clone https://github.com/potdaraayush/frontend-auth/
cd frontend-auth
```

### Backend Setup
cd backend
npm install

### create .env file in backend
PORT=5000
JWT_SECRET=dev_jwt_secret_change_later_123
MONGO_URI=mongodb://127.0.0.1:27017/frontend-auth

### run backend
npm run dev

### Frontend Setup
cd frontend
npm install

### Run frontend
npm run dev


---

## **Demo Accounts**  

## Demo Accounts
1. email : `admin@mail.com`
   password : `pass123`

2. email : `yush@mail.com`
   password : `Password1`

or create your own account :)

## Scaling for Production 
1. deploy frontend on vercel while backend on render
2. make sure cors is working
3. secrets exist in .env
4. add database indexing for frequent queries
5. implement refresh tokens
6. add caching 
7. use docker for ci/cd.

## Postman
you can import the postman collection :)

