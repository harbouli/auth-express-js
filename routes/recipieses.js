import { Router } from 'express'
const router = Router()
import { authMiddleware } from '../middlewares/authMiddleware.js'

router.get('/', authMiddleware, (req, res) => {
  res.status(203).send({ message: req.user })
})

export default router
