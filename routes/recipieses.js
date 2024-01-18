import { Router } from 'express'
const router = Router()
import { adminAdminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js'

router.get('/', authMiddleware,adminAdminMiddleware, (req, res) => {
  res.status(203).send({ message: req.user })
})

export default router
