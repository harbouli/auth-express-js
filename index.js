import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { Database } from './config/db.js'
import morgan from 'morgan'
import recipiesRouter from './routes/recipieses.js'
import authRouter from './routes/userRoute.js'

dotenv.config()

const app = express()

// Destructuring environment variables with default values
const { PORT = 3030, MONGODB_URL } = process.env

// Create a new instance of the Database class and connect to MongoDB
const db = new Database(MONGODB_URL)
db.connected()

// Middleware for logging HTTP requests in the console
app.use(morgan('dev'))

// Middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: ['http://localhost:3000'] }))

// Middleware to parse incoming JSON data
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/recipies', recipiesRouter)

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
