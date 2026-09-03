# 💰 Expense Tracker

A full-stack personal finance application built with React, TypeScript, Node.js, Express, and MongoDB.

The application allows authenticated users to manage their expenses, track monthly income, and view financial statistics through a dashboard.

## 🚀 Features

### Authentication
- User signup and login
- JWT authentication
- Protected frontend routes
- User-specific data

### Expenses
- Create expenses
- View expenses
- Update expenses
- Delete expenses
- Expense categories
- Expense dates and amounts
- Expenses are associated with the authenticated user

### Dashboard
- Total balance
- Monthly income
- Monthly expenses
- Savings overview
- Monthly spending chart
- Spending by category chart

### Monthly Income
- Add monthly income
- Update current month's income
- Income is stored per user
- Income is associated with a specific month and year

### Data Management
- TanStack Query for server state
- Automatic query invalidation after mutations
- REST API communication

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- TanStack Table
- Tailwind CSS
- shadcn/ui
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API

## 🗄️ Data Models

### User

Stores authentication and user information.

### Expense

Stores expenses belonging to an authenticated user.

### Income

Stores monthly income belonging to an authenticated user.
