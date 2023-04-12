import AppError from '../error'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'

export async function getPurchaseByIdHandle(
  id: string,
  purchaseRepository: purchaseRepository
) {
  const purchaseExists = purchaseRepository.idExists(id)

  if (!purchaseExists) {
    throw new AppError('Compra não encontrada', 404)
  }

  return await purchaseRepository.getPurchaseById(id)
}
