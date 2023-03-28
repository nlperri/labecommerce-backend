import { purchases } from '../database'
import AppError from '../error'

export function getUserPurchasesHandler(id: string) {
  const userPurchases = purchases.filter((purchase) => purchase.userId === id)

  if (userPurchases.length === 0) {
    throw new AppError('Compra não encontrada', 404)
  }

  return userPurchases
}
