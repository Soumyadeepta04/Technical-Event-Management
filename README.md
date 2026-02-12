# Technical Event Management System 

> A modern event management platform connecting event organizers, service vendors, and customers in one seamless ecosystem.

## 🚀 Quick Start

**Prerequisites:** Node.js 18+, MongoDB 6+

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your_secret_key_here

# Seed admin account
cd backend && node seed.js

# Run (2 terminals)
cd backend && npm run dev    # Port 5000
cd frontend && npm run dev   # Port 5173
```

**Default Admin:** `admin@eventmgmt.com` / `admin123`

---

## 🏗️ System Architecture

The application follows a three-tier architecture with role-based access control:

**Frontend (React + Vite)** → **REST API (Express)** → **Database (MongoDB)**

### Tech Stack
- **Frontend:** React 18, React Router v6, Axios, React Toastify
- **Backend:** Node.js, Express.js, JWT authentication, Multer
- **Database:** MongoDB with Mongoose ODM
- **Build Tools:** Vite 6

---

## 👥 User Roles & Capabilities

### 🔧 Admin
Oversees the entire platform with full control over users and vendors.

- Dashboard analytics (users, vendors, orders, revenue)
- Vendor management (CRUD operations, membership control)
- User management (add, update, delete users)
- Membership extensions and cancellations

### 🏪 Vendor
Service providers who list and manage their event-related offerings.

- Product catalog management (add, edit, delete items)
- Order tracking and status updates
- Sales dashboard with analytics
- Image uploads for products

### 🛒 User
Event organizers who browse vendors and place orders.

- Browse vendors by category
- Shopping cart and checkout
- Order tracking (5-stage status)
- Guest list management for events
- Payment options: Cash or UPI

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
```
POST   /auth/register    - Register new account
POST   /auth/login       - Login and get JWT token
GET    /auth/me          - Get current user info
```

### Admin (requires admin role)
```
GET    /admin/dashboard           - Platform statistics
GET    /admin/vendors             - List all vendors
POST   /admin/vendors             - Create vendor
PUT    /admin/vendors/:id         - Update vendor
PUT    /admin/vendors/:id/extend  - Extend membership
DELETE /admin/vendors/:id         - Remove vendor
GET    /admin/users               - List all users
POST   /admin/users               - Create user
PUT    /admin/users/:id           - Update user
DELETE /admin/users/:id           - Remove user
```

### Vendor (requires vendor role)
```
GET    /vendor/dashboard          - Vendor stats
GET    /vendor/products           - List own products
POST   /vendor/products           - Add product (multipart)
PUT    /vendor/products/:id       - Update product
DELETE /vendor/products/:id       - Delete product
GET    /vendor/orders             - View orders
PUT    /vendor/orders/:id/status  - Update order status
```

### User (requires user role)
```
GET    /user/vendors              - Browse vendors
GET    /user/vendors/:id/products - View vendor products
POST   /user/orders               - Place order
GET    /user/orders               - View order history
GET    /user/guests               - View guest list
POST   /user/guests               - Add guest
PUT    /user/guests/:id           - Update guest
DELETE /user/guests/:id           - Remove guest
```

---

## 💾 Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (bcrypt hashed),
  phone: String,
  role: Enum ['admin', 'vendor', 'user'],
  
  // Vendor-specific
  vendorCategory: Enum ['Caterer', 'Decorator', 'Photographer', 'DJ', 'Venue', 'Florist', 'Planner'],
  membershipStart: Date,
  membershipEnd: Date,
  membershipMonths: Number,
  
  // User-specific
  guestList: [{ name, email, phone, relation }],
  
  isActive: Boolean
}
```

### Product Schema
```javascript
{
  vendorId: ObjectId (ref: User),
  name: String (required),
  price: Number (required, min: 0),
  image: String,
  status: Enum ['Available', 'Unavailable']
}
```

### Order Schema
```javascript
{
  userId: ObjectId (ref: User),
  items: [{ productId, vendorId, name, price, qty, image }],
  totalAmount: Number,
  status: Enum ['Ordered', 'Received', 'Ready for Shipping', 'Out For Delivery', 'Delivered'],
  paymentMethod: Enum ['Cash', 'UPI'],
  shippingAddress: { address, city, pincode }
}
```

---

## 🔐 Security

- **JWT Authentication:** Tokens stored in localStorage, auto-attached via Axios interceptors
- **Password Hashing:** bcrypt with salt rounds
- **Role-Based Access Control (RBAC):** Middleware enforces role permissions
- **Protected Routes:** Frontend guards redirect unauthorized access

---

## 📁 Project Structure

```
├── backend/
│   ├── config/          # DB & Multer config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Product images
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/  # Reusable UI (Loader, Modal, ProtectedRoute)
        ├── context/     # Auth & Cart state
        ├── pages/       # Admin, Vendor, User dashboards
        ├── services/    # Axios API client
        └── App.jsx      # Route definitions
```

---

## 🎨 Key Features

**Admin Dashboard:** Real-time platform metrics  
**Vendor Membership:** Time-based subscriptions with extend/cancel  
**Guest List:** Event organizers can manage attendees  
**Order Tracking:** 5-stage delivery pipeline  
**Image Uploads:** Multer handles product photos  
**Category Filtering:** Browse vendors by service type

---

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

