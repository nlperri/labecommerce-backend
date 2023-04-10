import { TPurchase } from '../../types'

export interface purchaseRepository {
  getUserPurchases: (id: string) => Promise<TPurchase[] | []>
  create: (purchase: TPurchase) => Promise<void>
}
