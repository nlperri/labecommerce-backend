import { purchases } from '../../database'
import { TPurchase } from '../../types'
import { purchaseRepository } from '../contracts/purchaseRepository'

export class purchaseRepositoryInMemory implements purchaseRepository {
  getUserPurchases(id: string) {
    return purchases.filter((purchase) => purchase.userId === id)
  }
  create(purchase: TPurchase) {
    purchases.push(purchase)
  }
}
