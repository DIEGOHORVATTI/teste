import { Router } from 'express'

import { jwt, endpoint } from '@/middlewares'

import { createUserController } from './createUser/controller'
import { updateUserController } from './updateUser/controller'
import { getOneUserController } from './getOneUser/controller'
import { deleteDomainController } from './removeUser/controller'

const router = Router()

router.post('/', endpoint(createUserController))

// --------------- Protected Routes ---------------
router.use(jwt)

router.get('/', endpoint(getOneUserController))

router.put('/', endpoint(updateUserController))

router.delete('/', endpoint(deleteDomainController))

export default router
