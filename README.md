# School Management System (Under Development 🚧)

A web application designed to streamline academic operations, manage user data, and track student progress. This project is currently in its active development phase and features a decoupled architecture with a **React + Vite** frontend and a dedicated backend service.

---

## 🛠️ Current Features

### 🔑 Authentication & Admin Operations
* **Secure Access:** Fully integrated user login and sign-up features for tailored workspace access.
* **Admin Control Center:** Centralized panel for administrators to register, modify, and add new **teachers** and **students** to the system.

### 📅 Attendance & Tracking System
* **Teacher Roll Call:** Dedicated module allowing teachers to mark student attendance effortlessly.
* **Status Tracker:** Live database tracking to monitor whether students are **Present**, **Late**, or **Absent**.

### 📝 Academic & Communication Modules
* **Notice Board:** A central dashboard feed for publishing general announcements, holiday notices, and important news.
* **Result System:** A digital grading portal for processing and displaying academic performance marks.

---

## 🚀 Getting Started

Follow these steps to install dependencies and boot up both environments simultaneously from the root.

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn** package manager

### 1. Installation
Run this command in the **root folder** to install all required dependencies across the project:
```bash
npm install
```

### 2. Run the Application
Start both the **Vite frontend** and **Nodemon backend server** with a single command from the root directory:
```bash
npm run dev
```
* Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---

## 🧪 Development Tech Stack

* **Frontend:** React, Vite, HTML5, CSS3/Tailwind, JavaScript (ES6+)
* **Backend:** Node.js, Express, Nodemon (for hot-reloading)
* **Monorepo Tools:** Concurrently / npm workspaces (for single-command execution)
* **Database:** *[Pending Database Configuration]*
