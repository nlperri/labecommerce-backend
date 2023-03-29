import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'

export function editUserHandler(body: TUser, userRepository: userRepository) {
  const { email, password, id } = body

  const newEmail = email || undefined
  const newPassword = password || undefined

  const user = userRepository.getUserById(id)

  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }

  user.password = newPassword || user.password
  user.email = newEmail || user.email
}
