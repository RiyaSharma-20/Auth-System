# 🔐 Authentication System

A fully functional **authentication system** built with **TypeScript**, featuring a beautiful production-ready UI, robust validation, and complete authentication flow. 
This project demonstrates how to build a polished end-to-end authentication experience using only client-side logic with **localStorage** persistence.

***

## 🚀 Features

### 🔑 Core Functionality
- **User Registration**: Register with username, email, phone number, and password.  
- **Login**: Email + password authentication.  
- **Forgot Password**: Simulated email confirmation with reset dialog flow.  
- **Profile Management**: Authenticated users see their profile in the top-right corner.  
- **Logout**: Simple and intuitive logout functionality.  
- **Persistent Sessions**: User data stored via `localStorage`.  
- **Validation**: Strong validation with helpful error messages.  
- **Responsive**: Works seamlessly on mobile, tablet, and desktop.  

### 🎨 Design Highlights
- **Modern gradient backgrounds** for freshness.  
- **Card-based layouts** with smooth animations and hover effects.  
- **Clear color schemes** per flow:  
  - Registration → *Blue/Purple*  
  - Login → *Green/Blue*  
  - Password Reset → *Purple/Pink*  
- **Professional typography** with proper spacing and hierarchy.  
- **Lucide React icons** for clean, lightweight icons.  
- **Responsive grid layouts** optimized for all screen sizes.  

***

## 🛠️ Tech Stack

- **TypeScript**  
- **React with Hooks**  
- **Lucide React** (icons)  
- **CSS3 / Tailwind / Styled Components** (your choice here)  
- **LocalStorage API** (for persistence)  

***

## 📂 Project Structure

```bash
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components (forms, inputs, buttons)
│   ├── pages/           # Registration, Login, Forgot Password, Dashboard
│   ├── hooks/           # Custom hooks (validation, localStorage)
│   ├── context/         # Auth context provider
│   ├── utils/           # Helpers (validation, localStorage ops)
│   ├── App.tsx          # App router & core layout
│   └── main.tsx         # Entry point
├── package.json
├── tsconfig.json
└── README.md
