import AppError from '../error'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { TPurchase } from '../types'

export function createPurchaseHandler(
  body: TPurchase,
  purchaseRepository: purchaseRepository
) {
  const { userId, productId, quantity, totalPrice } = body

  if (!userId || !productId || !quantity || !totalPrice) {
    throw new AppError('Campos inválidos', 400)
  }

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  }

  purchaseRepository.create(newPurchase)
}
