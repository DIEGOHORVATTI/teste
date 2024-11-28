import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { authenticateUserController } from './login/controller'

const router = Router()

router.post('/login', endpoint(authenticateUserController))

export default router
