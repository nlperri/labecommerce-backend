import { db } from '../database/knex'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'

export async function getPurchasesHandler(
  purchaseRepository: purchaseRepository
) {
  const purchases = purchaseRepository.getPurchases()

  return purchases
}
