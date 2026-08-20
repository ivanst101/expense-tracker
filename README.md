# 💰 Expense Tracker

A full-stack expense tracking application that allows users to manage their personal expenses.

The application provides user authentication and allows authenticated users to create, view, update, and delete their expenses.

## 🚀 Features

* User authentication
* User signup
* Protected routes using JWT authentication
* View all expenses for the authenticated user
* Create new expenses
* Update existing expenses
* Delete expenses
* Expense categories
* Expense dates and amounts
* Responsive dashboard UI

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* TanStack Query
* React Hook Form
* Zod
* TanStack Table
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

## 📁 Project Structure

```text
expense-tracker/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── package.json
│
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ivanst101/expense-tracker.git
```

Navigate into the project:

```bash
cd expense-tracker
```

## 🔧 Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
```

Start the development server:

```bash
npm run dev
```

The backend server will run on:

```text
http://localhost:3000
```

## 🎨 Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## 🔐 Authentication

The application uses JWT authentication to protect user-specific data.

When a user authenticates:

1. The user signs up or logs in.
2. The backend generates a JWT token.
3. The token is used to authenticate protected API requests.
4. The backend identifies the authenticated user.
5. Users can only access and manage their own expenses.

Example request:

```http
GET /api/v1/expenses
Authorization: Bearer <token>
```

## 📡 API Endpoints

### Users

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | `/api/v1/users/signup` | Create a new user |
| POST   | `/api/v1/users/login`  | Log in a user     |

### Expenses

| Method | Endpoint               | Description                                 |
| ------ | ---------------------- | ------------------------------------------- |
| GET    | `/api/v1/expenses`     | Get all expenses for the authenticated user |
| POST   | `/api/v1/expenses`     | Create a new expense                        |
| GET    | `/api/v1/expenses/:id` | Get a specific expense                      |
| PATCH  | `/api/v1/expenses/:id` | Update an expense                           |
| DELETE | `/api/v1/expenses/:id` | Delete an expense                           |

## 📦 Expense Example

An expense contains information such as:

```json
{
  "id": 1,
  "title": "Groceries",
  "amount": 2500,
  "category": "Food",
  "date": "2026-07-20T18:56:59.005Z"
}
```

## 🔄 Frontend Data Flow

The frontend communicates with the Express API using `fetch` and manages server state with TanStack Query.

The general flow is:

```text
React Component
      ↓
TanStack Query Hook
      ↓
API Service
      ↓
Express Server
      ↓
Database
```

When a user creates, updates, or deletes an expense, TanStack Query can invalidate the expenses query and fetch the latest data.

⭐ If you found this project interesting, feel free to explore the repository!
