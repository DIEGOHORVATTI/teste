import { error } from 'elysia'

import { IUser, User } from '@/models/User'

export const updateUserService = async (id: string, { email, password, ...restUser }: IUser['userSchema']) => {
  const user = await User.findById(id)
  if (!user) {
    throw error('Not Found', 'Usuário não encontrado')
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    if (existingUser && existingUser.id !== id) {
      throw error('Conflict', 'Esse e-mail já está em uso')
    }

    user.email = email
  }

  if (password) {
    user.password = password
  }

  Object.assign(user, restUser)

  const updatedUser = await user.save().catch(err => {
    console.error('Error on update user', err)
    throw error('Internal Server Error', 'Erro ao atualizar usuário')
  })

  const { password: _, ...userWithoutPassword } = updatedUser.toObject()

  return { user: userWithoutPassword }
}
