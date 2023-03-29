import AppError from '../error'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'

export function getUserPurchasesHandler(
  id: string,
  purchaseRepository: purchaseRepository,
  userRepository: userRepository
) {
  const userExists = userRepository.idExists(id)

  if (!userExists) {
    throw new AppError('Usuário não encontrado', 404)
  }

  const userPurchases = purchaseRepository.getUserPurchases(id)

  if (userPurchases.length === 0) {
    throw new AppError('Compra não encontrada', 404)
  }

  return userPurchases
}
