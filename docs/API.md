# GaonBasket API Documentation

## Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://api.gaonbasket.com`

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data fetched",
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePassword@123",
  "confirmPassword": "SecurePassword@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "customer"
    }
  }
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword@123"
}
```

**Response:** Same as Register

### Logout
**POST** `/api/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Refresh Token
**POST** `/api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc..."
  }
}
```

### Get Current User
**GET** `/api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "customer",
    "isEmailVerified": true,
    "isActive": true,
    "createdAt": "2024-01-18T10:00:00Z",
    "updatedAt": "2024-01-18T10:00:00Z"
  }
}
```

---

## Products Endpoints

### Get All Products
**GET** `/api/products?page=1&limit=20&category=123&search=tomato&sort=newest`

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `category` (string, optional)
- `search` (string, optional)
- `sort` (string: newest, price-low, price-high, rating)

**Response:**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

### Get Product Details
**GET** `/api/products/:id`

**Response:**
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tomato",
    "description": "Fresh red tomatoes",
    "price": 30,
    "originalPrice": 40,
    "discount": 25,
    "categoryId": "507f1f77bcf86cd799439012",
    "image": "https://...",
    "stock": 100,
    "unit": "kg",
    "rating": 4.5,
    "reviews": 120,
    "isActive": true
  }
}
```

### Create Product (Admin)
**POST** `/api/products`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Tomato",
  "description": "Fresh red tomatoes",
  "price": 30,
  "originalPrice": 40,
  "categoryId": "507f1f77bcf86cd799439012",
  "image": "https://...",
  "images": ["https://..."],
  "stock": 100,
  "unit": "kg",
  "sku": "TOMATO-001"
}
```

### Update Product (Admin)
**PUT** `/api/products/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:** Same as Create

### Delete Product (Admin)
**DELETE** `/api/products/:id`

**Headers:** `Authorization: Bearer <admin_token>`

---

## Categories Endpoints

### Get All Categories
**GET** `/api/categories?page=1&limit=20`

### Get Category Details
**GET** `/api/categories/:id`

### Create Category (Admin)
**POST** `/api/categories`

**Request Body:**
```json
{
  "name": "Vegetables",
  "image": "https://..."
}
```

### Update Category (Admin)
**PUT** `/api/categories/:id`

### Delete Category (Admin)
**DELETE** `/api/categories/:id`

---

## Cart Endpoints

### Get Cart
**GET** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "productId": "507f1f77bcf86cd799439014",
        "quantity": 2,
        "price": 30,
        "total": 60
      }
    ],
    "subtotal": 60,
    "tax": 3,
    "deliveryFee": 50,
    "discount": 0,
    "total": 113
  }
}
```

### Add to Cart
**POST** `/api/cart/items`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

### Update Cart Item
**PUT** `/api/cart/items/:itemId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "quantity": 5
}
```

### Remove Cart Item
**DELETE** `/api/cart/items/:itemId`

**Headers:** `Authorization: Bearer <token>`

### Clear Cart
**DELETE** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

---

## Orders Endpoints

### Create Order
**POST** `/api/orders`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "shippingAddressId": "507f1f77bcf86cd799439011",
  "paymentMethod": "cod",
  "notes": "Leave at door",
  "couponCode": "SAVE10"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "items": [...],
    "orderStatus": "pending",
    "paymentStatus": "pending",
    "total": 113,
    "createdAt": "2024-01-18T10:00:00Z"
  }
}
```

### Get Orders
**GET** `/api/orders?page=1&limit=10`

**Headers:** `Authorization: Bearer <token>`

### Get Order Details
**GET** `/api/orders/:id`

**Headers:** `Authorization: Bearer <token>`

### Cancel Order
**PATCH** `/api/orders/:id/cancel`

**Headers:** `Authorization: Bearer <token>`

### Update Order Status (Admin)
**PATCH** `/api/orders/:id/status`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "orderStatus": "confirmed",
  "paymentStatus": "completed"
}
```

---

## Addresses Endpoints

### Get Addresses
**GET** `/api/addresses`

**Headers:** `Authorization: Bearer <token>`

### Create Address
**POST** `/api/addresses`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "home",
  "street": "123 Main St",
  "city": "New Delhi",
  "state": "Delhi",
  "postalCode": "110001",
  "landmark": "Near Park",
  "isDefault": true,
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

### Get Address Details
**GET** `/api/addresses/:id`

**Headers:** `Authorization: Bearer <token>`

### Update Address
**PUT** `/api/addresses/:id`

**Headers:** `Authorization: Bearer <token>`

### Delete Address
**DELETE** `/api/addresses/:id`

**Headers:** `Authorization: Bearer <token>`

---

## Error Codes

| Code | Message |
|------|---------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

API is rate-limited to 100 requests per 15 minutes per IP address.

---

**Last Updated**: January 18, 2024  
**Designed & Developed by Mohammad Ashif**
