import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'

export function deleteUserByIdHandler(
  id: string,
  userRepository: userRepository
) {
  const userToDelete = userRepository.getUserById(id)

  if (!userToDelete) {
    throw new AppError('Usuário não encontrado', 404)
  }

  userRepository.deleteUser(id)
}
