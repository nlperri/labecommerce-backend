import { purchases } from '../database'
import AppError from '../error'
import { TPurchase } from '../types'

export function createPurchaseHandler(body: TPurchase) {
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

  purchases.push(newPurchase)
}
