# 🧺 Laundry Order Management System (AI-First)

## 📌 Introduction

The Laundry Order Management System is a full-stack web application designed to simplify the daily operations of a dry cleaning store. It enables users to create orders, manage garment details, track order status, and monitor business performance through a dashboard.

This project focuses on **speed, simplicity, and real-world usability**, while leveraging AI tools to accelerate development and problem-solving.

---

## ✨ Features

### 🧾 Order Management

* Create orders with:

  * Customer name & phone
  * Multiple garments (Shirt, Pants, Saree)
  * Quantity per item
* Automatic total bill calculation

### 🔄 Order Status

* Status flow:

  * RECEIVED → PROCESSING → READY → DELIVERED
* Update status directly from UI

### 🔍 Search & Filter

* Search by name or phone number
* Filter orders by status

### 📊 Dashboard

* Total Orders
* Total Revenue
* Orders per status

### ✏️ Edit & Delete

* Edit order using modal popup
* Update quantity and auto-recalculate total
* Delete order with confirmation popup (SweetAlert2)

---

## 🧠 AI Usage Report

### Tools Used

* ChatGPT 

### Where AI Helped
* Debugging runtime errors and improving logic


### What AI Got Wrong

* Incorrect import/export patterns
* Incomplete backend update logic
* UI inconsistencies

### Improvements Made

* Fixed ESM/CommonJS issues manually
* Improved backend update logic (items + total recalculation)
* Unified UI design system

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* React Hot Toast
* SweetAlert2

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📁 Folder Structure

```id="a1"
laundry-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── config/          # DB connection
│   │   └── server.js        # Entry point
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Pages (Dashboard, Orders)
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone Repository

```bash id="a2"
git clone <your-repo-link>
cd laundry-app
```

---

### 2️⃣ Backend Setup

```bash id="a3"
cd backend
npm install
```

Create `.env` file:

```env id="a4"
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash id="a5"
npm run dev
```

> Entry file: `backend/src/server.js`

---

### 3️⃣ Frontend Setup

```bash id="a6"
cd frontend
npm install
npm run dev
```

---

### 🌐 Access Application

* Frontend: http://localhost:5173
* Backend API: http://localhost:5000/api

---

## 🔌 API Endpoints

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| POST   | /api/orders     | Create order   |
| GET    | /api/orders     | Get all orders |
| PUT    | /api/orders/:id | Update order   |
| DELETE | /api/orders/:id | Delete order   |
| GET    | /api/dashboard  | Dashboard data |

---

## ⚖️ Trade-offs

* Used native `<select>` (limited styling)
* No authentication (kept simple for assignment)
* Minimal validation

---

## 🚀 Future Improvements

* Add authentication (JWT)
* Add charts (Recharts)
* Mobile responsive design
* Deployment (Vercel + Render)
* Advanced search & filtering

---

## 🎥 Demo

<img width="1919" height="910" alt="Screenshot 2026-04-29 201401" src="https://github.com/user-attachments/assets/13d27dec-3837-4e4e-9c33-ada0a87e3a37" />
<img width="1919" height="911" alt="Screenshot 2026-04-29 201928" src="https://github.com/user-attachments/assets/7ab234ef-2039-4bec-a4b9-ea13a4708466" />



---

## 💡 Conclusion

This project demonstrates:

* Fast development using AI tools
* Strong understanding of full-stack architecture
* Clean UI/UX design
* Practical problem-solving and debugging skills

---

## 🙌 Author

**Mohd Ali Bakhtiyar**
