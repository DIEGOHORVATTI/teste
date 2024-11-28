import { RequestHandler } from 'express'
import { authenticateUserService } from './service'

export const authenticateUserController: RequestHandler = async (req, res) => {
  const token = await authenticateUserService(req.body)

  res.json({ token })
}
