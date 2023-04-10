import { db } from '../../database/knex'
import { TPurchase } from '../../types'
import { purchaseRepository } from '../contracts/purchaseRepository'

export class purchaseRepositoryInMemory implements purchaseRepository {
  async getUserPurchases(id: string) {
    const result = await db('purchases').where({ buyer_id: id })

    return result
  }
  async create(purchase: TPurchase) {
    const { userId, id, paid, totalPrice } = purchase

    await db
      .insert({
        id: id,
        buyer_id: userId,
        paid: paid,
        total_price: totalPrice,
      })
      .into('purchases')
  }
}
