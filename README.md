# 🛍️ Campus Marketplace

**Campus Marketplace** is a full-stack e-commerce web application designed to provide a centralized marketplace for campus communities. The platform allows customers to browse and purchase products, sellers to manage their products and orders, and administrators to manage users, sellers, categories, products, and marketplace operations.

The project is built with a modern frontend and secure RESTful backend architecture, with a focus on scalability, usability, role-based access control, and professional UI design.

## 🚀 Features

### 👤 Customer

* User registration and login
* JWT-based authentication
* Browse products and categories
* Product search and filtering
* Product details
* Shopping cart management
* Checkout and order placement
* Order history and status tracking
* Responsive and professional UI

### 🏪 Seller

* Seller registration/profile
* Seller dashboard
* Add and manage products
* Update product information
* Manage product availability
* View and manage orders
* Seller-specific marketplace operations

### 🛡️ Admin

* Secure admin authentication
* Admin dashboard
* User management
* Seller management and approval
* Product management
* Category management
* Order management
* Order status updates
* Marketplace analytics
* Revenue and order statistics

## 🔐 Security

* JWT-based authentication
* Role-based authorization
* Customer, Seller, and Admin roles
* Protected admin routes
* Backend API authorization
* Password encryption
* CORS configuration
* Global exception handling
* Input validation

## 💳 Payment Integration

The application is designed with payment integration in mind using **Razorpay**.

Payment functionality can be enabled and tested after deployment without changing the core marketplace architecture.

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* JavaScript
* Responsive UI

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* REST APIs
* Lombok

### Database

* MySQL

### Deployment

* Vercel — Frontend
* Render — Backend
* Aiven — MySQL Database

## 🏗️ Project Architecture

```text
Campus Marketplace
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   ├── admin
│   └── utils
│
└── backend
    ├── controller
    ├── service
    ├── repository
    ├── entity
    ├── dto
    ├── security
    ├── config
    └── exception
```

## 🎯 Project Objective

The primary objective of Campus Marketplace is to create a secure and scalable digital marketplace specifically suited to campus environments. It demonstrates the complete development lifecycle of a modern full-stack application, including frontend development, REST API design, database management, authentication, authorization, deployment, and e-commerce functionality.

## 📌 Future Enhancements

* Razorpay payment processing
* Product reviews and ratings
* Wishlist
* Inventory and stock management
* Email notifications
* Advanced analytics
* Product image optimization
* Order tracking
* Advanced search and filtering

## 👨‍💻 Project Type

**Full-Stack Campus Project / E-Commerce Marketplace**

Built using **React + Spring Boot + MySQL** with a secure role-based architecture.
