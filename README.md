# 🎨 ArtHub

### Discover, Showcase, and Collect Exceptional Digital Artwork

ArtHub is a full-stack online art marketplace where artists can showcase and sell their artwork while buyers can discover, purchase, and interact with creative works through a secure and modern platform.

🌐 **Live Site:** https://arthub-client-hzjp.vercel.app

---

# 📌 About the Project

ArtHub is designed to bridge the gap between artists and art enthusiasts by providing a digital marketplace for buying and selling artwork. Artists can upload and manage their collections, while buyers can securely purchase artworks, leave reviews, and maintain their purchase history.

The project demonstrates modern full-stack development using **Next.js**, **Node.js**, **Express.js**, **MongoDB**, **Better Auth**, **JWT**, and **Stripe**, with a focus on security, scalability, and user experience.

---

# 📋 Project Overview

## 🎯 Objective

The objective of ArtHub is to provide a secure and user-friendly online marketplace where artists can promote and sell their artwork while buyers can easily discover and purchase creative pieces. The project also demonstrates role-based authentication, secure payment integration, and dashboard management.

## 👥 Target Audience

- Artists who want to showcase and sell their artwork.
- Buyers looking for unique digital artwork.
- Art enthusiasts who enjoy exploring creative collections.

## 🚀 Deployment

| Service | Platform |
|---------|----------|
| Client | Vercel |
| Server | Vercel |
| Database | MongoDB Atlas |

---

# ✨ Key Features

- 🎭 **Role-based authentication** for Buyers, Artists, and Admins using Better Auth.
- 💳 **Secure Stripe payment integration** for purchasing artwork.
- 🖼️ **Advanced artwork browsing** with search, filtering, sorting, and pagination.
- 💬 **Purchase-based comment system**, allowing only verified buyers to leave reviews.
- 📊 **Interactive dashboards** with sales history, purchase history, and platform analytics.
- 📈 **Real-time analytics** including revenue tracking, sales reports, and category distribution.
- 🖼️ **Artwork upload and management** with image hosting support.
- 📱 Fully responsive interface optimized for desktop, tablet, and mobile devices.

---

# 🔓 Public Pages

The following pages are accessible without authentication:

- 🏠 Home
- 🎨 Browse Artworks
- 📄 Artwork Details
  

---

# 🔐 Protected Pages

Authentication is required to access the following pages:

### 👤 Buyer

- Purchase History
- Purchased Artworks
- Subscription

### 🎨 Artist

- Dashboard
- Add Artwork
- Manage Artworks
- Sales History

### 🛡️ Admin

- Dashboard
- Manage Users
- Manage Artworks
- Transactions

---

# 🛠️ Tech Stack

## 🎨 Frontend

- Next.js (App Router)
- React.js
- Tailwind CSS
- DaisyUI

## ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT
- Stripe API

## 🔧 Tools & Services

- MongoDB Atlas
- imgBB
- Stripe
- Git
- GitHub
- Vercel
- React Toastify

---

# 📦 Dependencies

### Client

```bash
next
react
tailwindcss
daisyui
better-auth
react-icons
react-toastify
framer-motion
```

### Server

```bash
express
mongodb
better-auth
jsonwebtoken
stripe
cors
dotenv
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Client Repository

```bash
git clone https://github.com/nnanjum1/arthub_client.git
```

Navigate to the project directory.

```bash
cd arthub_client
```

Install dependencies.

```bash
npm install
```

Create a `.env.local` file and add the required environment variables.

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_BASE_URL=your_base_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Start the development server.

```bash
npm run dev
```

The client will run on:

```
http://localhost:3000
```

---

## 2️⃣ Clone the Server Repository

```bash
git clone https://github.com/nnanjum1/arthub-server.git
```

Navigate to the project directory.

```bash
cd arthub-server
```

Install dependencies.

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000
STRIPE_SECRET_KEY=your_stripe_secret_key
IMGBB_API_KEY=your_imgbb_api_key
```

Start the backend server.

```bash
npm start
```

The server will run on:

```
http://localhost:5000
```

---

# 🚀 Live Demo

🌐 **Live Website**

https://arthub-client-hzjp.vercel.app

---

# 💻 Source Code

### Client Repository

https://github.com/nnanjum1/arthub_client

### Server Repository

https://github.com/nnanjum1/arthub-server

---

# 👨‍💻 Author

**Najmun Nahar Anjum**

🌐 Portfolio: https://professional-portfolio-omega-tan.vercel.app

💻 GitHub: https://github.com/nnanjum1

💼 LinkedIn: https://www.linkedin.com/in/najmunnaharanjum/

📧 Email: najmunnanjum121@gmail.com

---

⭐ If you found this project helpful, consider giving it a star!
