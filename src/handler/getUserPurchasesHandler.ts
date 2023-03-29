import AppError from '../error'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'

export function getUserPurchasesHandler(
  id: string,
  purchaseRepository: purchaseRepository
) {
  const userPurchases = purchaseRepository.getUserPurchases(id)

  if (userPurchases.length === 0) {
    throw new AppError('Compra não encontrada', 404)
  }

  return userPurchases
}
