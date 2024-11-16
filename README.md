# Insurance Hub API - AdonisJS 5

Backend API for an insurance hub application built with AdonisJS 5.

## Features

- **User Registration**: Allows users to create an account.
- **User Login**: Authenticates users and provides access tokens.
- **User Logout**: Revokes user tokens to securely log out.
- **Authenticated User Info**: Retrieves details about the logged-in user.
- **Middleware Integration**: Protects sensitive routes using authentication middleware.

## Routes

### Auth Routes

| Method | Endpoint       | Description                      | Middleware         |
|--------|----------------|----------------------------------|--------------------|
| POST   | `/auth/register` | Register a new user             | None               |
| POST   | `/auth/login`    | Log in an existing user         | None               |
| POST   | `/auth/logout`   | Log out the authenticated user  | `middleware.auth()`|

### User Info Route

| Method | Endpoint       | Description                          | Middleware         |
|--------|----------------|--------------------------------------|--------------------|
| GET    | `/me`          | Get details of the authenticated user | `middleware.auth()`|

### Default Route

| Method | Endpoint | Description        |
|--------|----------|--------------------|
| GET    | `/`      | Returns a welcome message |

## Setup

### Prerequisites
- Node.js (v22.0.0 or later)
- AdonisJS 5
- A database configured for the application

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables by creating a `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database
   APP_KEY=your_application_key
   ```
4. Run database migrations:
   ```bash
   node ace migration:run
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Registration
To register a new user, send a `POST` request to `/auth/register` with the following payload:
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Login
To log in, send a `POST` request to `/auth/login` with:
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```
The response will include an access token.

### Logout
To log out, send a `POST` request to `/auth/logout` with the token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

### Get Authenticated User Info
To retrieve the logged-in user’s details, send a `GET` request to `/me` with the token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

