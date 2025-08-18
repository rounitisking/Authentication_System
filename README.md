# Authentication System

A complete Node.js authentication system with user registration, email verification, login, password reset, and profile management.

## Features

- User registration with email verification
- Secure login with JWT tokens
- Password reset functionality
- User profile management
- Middleware-based authentication
- MongoDB integration
- Email notifications using Nodemailer

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` file with your configuration:

- `MONGODB_URL`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- Email settings for Gmail SMTP

### 3. Database Setup

Make sure MongoDB is running on your system or use MongoDB Atlas.

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/users/registerUser` - Register a new user
- `GET /api/v1/users/verificationToken/:token` - Verify email
- `POST /api/v1/users/login` - User login
- `PUT /api/v1/users/logoutUser` - User logout (requires auth)

### User Management

- `GET /api/v1/users/viewProfile` - Get user profile (requires auth)
- `POST /api/v1/users/forgotPassword` - Request password reset
- `PUT /api/v1/users/resetPassword/:token` - Reset password

## Request Examples

### Register User

```json
POST /api/v1/users/registerUser
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

### Login

```json
POST /api/v1/users/login
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

### Forgot Password

```json
POST /api/v1/users/forgotPassword
{
  "email": "john@example.com"
}
```

## Password Requirements

- Minimum 6 characters
- Must contain letters, numbers, and special characters (@$!%\*#?&)

## Email Configuration

The system uses Nodemailer for email notifications. Configure your email settings in the `.env` file.

For Gmail, you'll need to:

1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in the `PWD` field
