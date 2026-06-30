# 🎨 ArtHub — Online Art Marketplace

> A full-stack MERN-based marketplace platform connecting artists, collectors, and buyers through a secure and modern digital art ecosystem.

---

## 🌐 Live Demo

- 🚀 Live Site: https://arthub-client-hzjp.vercel.app
- 💻 Client Repo: https://github.com/nnanjum1/arthub_client.git
- 🛠️ Server Repo: https://github.com/nnanjum1/arthub-server.git

---

## 📌 Project Overview

ArtHub is a modern online art marketplace that allows artists to showcase and sell their artworks globally while enabling users to discover, purchase, and interact with digital art.

The platform implements **role-based authentication, Stripe payment integration, analytics dashboards, and a secure comment system**, simulating a real-world SaaS marketplace.

---

## 🎯 Purpose

Traditional art buying is limited to physical galleries. ArtHub solves this by:

- Providing global access to digital artworks  
- Helping artists monetize their work  
- Enabling secure online payments  
- Implementing scalable marketplace architecture  

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Email/password login system  
- Google OAuth login  
- JWT-based authentication  
- Role-based access control (User / Artist / Admin)

---

### 🖼️ Artwork Marketplace
- Browse all artworks publicly  
- Search by title or artist  
- Filter by category and price range  
- Sort by newest and price  
- Pagination support  
- Artwork details page with full info  

---

### 💳 Payment System (Stripe)
- Stripe Checkout integration  
- Artwork purchase system  
- Subscription tiers (Free / Pro / Premium)  
- Purchase validation before checkout  
- Transaction tracking system  

---

### 💬 Comment System
- Only buyers can comment (purchase-based access)  
- Add / edit / delete own comments  
- Secure backend validation  
- Real-time comment updates  

---

### 📊 Dashboard System

#### 👤 User Dashboard
- Purchase history  
- Bought artworks gallery  
- Subscription overview  

#### 🎨 Artist Dashboard
- Manage artworks (CRUD)  
- Sales history  
- Upload artworks (imgBB)  

#### 🛡️ Admin Dashboard
- Manage users (role control)  
- Manage artworks  
- View all transactions  
- Analytics dashboard  

---

### 📈 Analytics
- Sales chart  
- Category distribution pie chart  
- Revenue tracking  
- Platform insights  

---

### 🎨 UI/UX Features
- Fully responsive design  
- Skeleton loading states  
- Global error handling (404 + fallback UI)  
- Clean modern UI with proper spacing  
- Smooth navigation and routing  

---

## 🧰 Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Stripe API

### Services
- imgBB (Image Uploads)  
- Stripe (Payments)  
- Betterauth

---

## 📦 NPM Packages

### Client Side
- next
- react
- tailwindcss
- react-toastify


### Server Side
- express
- mongodb
- cors
- dotenv
- stripe
- nodemon
