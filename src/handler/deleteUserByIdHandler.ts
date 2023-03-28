import { users } from '../database'
import AppError from '../error'

export function deleteUserByIdHandler(id: string) {
  const userToDelete = users.findIndex((user) => user.id === id)

  if (userToDelete === -1) {
    throw new AppError('Usuário não encontrado', 404)
  }

  users.splice(userToDelete, 1)
}
