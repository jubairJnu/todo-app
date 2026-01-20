
# 📝 To-Do App (Nest.js + Prisma + MySQL + Next.js)

A full-stack To-Do application built with **Nest.js**, **Prisma**, **MySQL**, and **Next.js**. This project follows **Clean Architecture** and the **Repository Pattern** to ensure scalability and maintainability.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeOrm](https://img.shields.io/badge/TypeORM-FE0803?logo=typeorm&logoColor=fff)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## 📁 Project Structure

```bash
.
├── backend/           # Nest.js API
├── frontend/          # Next.js App
├── docker-compose.yml # MySQL (Docker)
└── README.md
```
🚀 Tech Stack
### Backend
- Framework: Nest.js
- ORM: TypeOrm
- Database: MySQL
- Language: TypeScript
- Security: JWT Authorization (Middleware)

### Frontend
- Framework: Next.js (App Router)
- HTTP Client: Axios
- Styling: Tailwind CSS

### Infrastructure
- Containerization: Docker & Docker Compose

✅ Features
- CRUD Operations: Create, Read, Update, and Delete To-Dos.
- Status Filtering: Filter tasks by PENDING, IN_PROGRESS, or DONE.
- Clean Architecture: Strict separation of concerns (Controller → Service → Repository → Prisma).
- Repository Pattern: Services interact with Repositories, never directly with Prisma.
- JWT Protection: APIs are secured using a pre-shared JWT token.
- Dockerized Database: Easy MySQL setup via Docker.

🧱 Architecture
The backend follows a layered architecture to maintain code quality:
```bash 
graph LR
    A[Controller] --> B[Service]
    B --> C[Repository]
    C --> D[Prisma Client]
    D --> E[(MySQL Database)]


```
- Controller: Handles incoming HTTP requests.
- Service: Contains business logic.
- Repository: Abstraction layer for database access.
- TypeOrm: The ORM layer connecting to the DB.

## 🛠️ Getting Started 

#### Clone Repository
```bash
git clone https://github.com/jubairJnu/todo-app
```

### 1.🐳 MySQL Setup (Docker)
Start the MySQL container using Docker Compose:
```Bash
docker compose up -d
```
### 2. ⚙️ Backend Setup
Navigate to the backend directory and install dependencies:
```Bash
cd backend
npm install
```

Create a .env file in the backend/ root:
as env.example

Run migrations and start the server:
```Bash 
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```
### 🚀 API Base URL:
 ```bash 
 cd http://localhost:3001/api/v13.
 ```

 ## 🎨 Frontend Setup
 Navigate to the frontend directory and install dependencies:
 ```Bash 
 cd frontend
npm install
```
Create a .env.local file in the frontend/ root:
```bash
NEXT_PUBLIC_API_URL=[http://127.0.0.1:3001/api/v1](http://127.0.0.1:3001/api/v1)

NEXT_PUBLIC_API_TOKEN=your_jwt_token
```
Start the frontend development server:
```Bash 
npm run dev
```
🚀 App URL: http://localhost:3000
### 🔐 Authorization
- Note: This project does not include a user login/registration system (out of assignment scope).
- Mechanism: APIs are protected using a JWT Middleware.- Usage: All requests from the frontend must include the pre-shared Bearer token in the headers.

###📡 API Endpoints
```
Method,Endpoint,Description
POST,/todos,Create a new To-Do
GET,/todos,Get all To-Dos
GET,/todos?status=PENDING,Get To-Dos filtered by status
GET,/todos/:id,Get a specific To-Do by ID
PUT,/todos/:id,Update a To-Do
DELETE,/todos/:id,Delete a To-Do

```



