import { users } from '../database'
import AppError from '../error'
import { TUser } from '../types'

export function editUserHandler(body: TUser) {
  const { email, password, id } = body

  const newEmail = email || undefined
  const newPassword = password || undefined

  const user = users.find((user) => user.id === id)

  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }

  user.password = newPassword || user.password
  user.email = newEmail || user.email
}
