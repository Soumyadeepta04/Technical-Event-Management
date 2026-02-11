# Event Management System

Hey! Welcome to the **Event Management System**. This is a full-stack web application designed to help handle events, bookings, and user roles (Admins, Vendors, and regular Users) seamlessly.

It's built with a **Node.js/Express** backend and a **React (Vite)** frontend.

---

## Quick Start

Get up and running in just a few steps.

### 1. Install Dependencies
You can install everything at once from the root folder:

```bash
npm run install:all
```

Or, if you prefer doing it manually:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables
You'll need to set up your environment variables for the backend to work.

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

> **Note:** Make sure you have MongoDB running locally or have a cloud URI ready.

### 3. Run the App
To start both the backend and frontend at the same time (the easy way):

```bash
# From the root directory
npm run dev
```

If you want to run them separately:

*   **Backend:** `cd backend && npm run dev` (Runs on port 5000)
*   **Frontend:** `cd frontend && npm run dev` (Usually runs on port 5173)

---

## 🛠️ Tech Stack

*   **Frontend:** React, Vite, React Router, Context API
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Styling:** Custom CSS

## 📂 Project Structure

*   `/backend` - API logic, database models, and routes.
    *   `/config` - DB connection setup.
    *   `/controllers` - Logic for handling requests.
    *   `/routes` - API endpoints (User, Vendor, Admin, Auth).
*   `/frontend` - React application.
    *   `/src/pages` - Main application pages.
    *   `/src/context` - State management (Auth, Cart).

## ✨ Key Features

*   **Role-Based Access:** Distinct features for Admins, Vendors, and Users.
*   **Authentication:** Secure login and registration.
*   **Event Handling:** Structure to manage event listings and bookings.

---

### 🌱 Seeding the Database
If you need some initial data to test with, you can run the seed script:

```bash
npm run seed
```
