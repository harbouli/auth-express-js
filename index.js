import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import { Database } from './config/db.js'
import morgan from 'morgan'
dotenv.config()
import recipiesRouter from "./routes/recipieses.js"
import authRouter from "./routes/userRoute.js"

const app = express()

const {PORT = 3030,MONGODB_URL}= process.env 
const db = new Database(MONGODB_URL)
db.connected()

app.use(morgan("dev"))
app.use(cors({origin:["http://localhost:3000"]}))
app.use(express.json())

app.use("/api/v1/auth",authRouter)


app.use("/api/v1/recipies",recipiesRouter)
app.listen(PORT,()=>{
    console.log(`server running on prot ${PORT}`)
})