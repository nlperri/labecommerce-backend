import { TPurchase } from '../../types'

export interface purchaseRepository {
  getUserPurchases: (id: string) => TPurchase[]
  create: (purchase: TPurchase) => void
}
