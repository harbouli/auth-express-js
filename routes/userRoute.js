import { Router } from "express";
import { auth } from "../controllers/authConteroller.js";


const routes = Router()

routes.post('/signup', auth.signup)
routes.post('/signin', auth.signin)


export default routes

