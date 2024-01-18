# Express.js Recipe App

A simple Express.js application for managing recipes, featuring user authentication and MongoDB integration.

## Features

- **User Authentication:** Secure user registration and login functionality using JWT (JSON Web Tokens).
- **MongoDB Integration:** Utilizes MongoDB for storing and retrieving recipe data.
- **API Endpoints:** Provides RESTful API endpoints for user authentication and recipe management.
- **Middleware:** Includes middleware for logging HTTP requests and handling Cross-Origin Resource Sharing (CORS).
- **Modular Routing:** Organizes routes into separate files for authentication and recipe management.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection string in the `.env` file.
4. Run the application using `npm start`.

## Usage

- Access the authentication endpoints at `/api/v1/auth` for user registration and login.
- Manage recipes using the `/api/v1/recipies` endpoints.

## Technologies Used

- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Cors
- Morgan

## Contributing

Feel free to contribute by opening issues or pull requests. Bug reports, feature requests, and feedback are welcome!

