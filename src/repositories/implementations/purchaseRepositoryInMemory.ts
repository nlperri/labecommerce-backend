import { db } from '../../database/knex'
import { TPurchase } from '../../types'
import { purchaseRepository } from '../contracts/purchaseRepository'

export class purchaseRepositoryInMemory implements purchaseRepository {
  async getUserPurchases(id: string) {
    const result = db.raw(`
    SELECT * FROM purchases
    WHERE buyer_id = "${id}"
    `)

    return result
  }
  async create(purchase: TPurchase) {
    const { userId, id, paid, totalPrice } = purchase

    await db.raw(`
    INSERT INTO purchases (id, buyer_id , paid, total_price)
    VALUES ("${id}","${userId}","${paid}","${totalPrice}" )
    `)
  }
}
