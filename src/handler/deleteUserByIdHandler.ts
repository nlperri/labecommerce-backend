import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'

export async function deleteUserByIdHandler(
  id: string,
  userRepository: userRepository
) {
  const userToDelete = await userRepository.getUserById(id)

  if (!userToDelete) {
    throw new AppError('Usuário não encontrado', 404)
  }

  await userRepository.deleteUser(id)
}
