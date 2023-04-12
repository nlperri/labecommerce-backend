import { TPurchase } from '../../types'

export interface purchaseRepository {
  getUserPurchases: (id: string) => Promise<TPurchase[] | []>
  create: (purchase: TPurchase) => Promise<void>
  idExists: (id: string) => Promise<boolean>
  getPurchaseById: (id: string) => Promise<any>
  createPurchasesProducts: (
    id: string,
    productId: string,
    quantity: number
  ) => Promise<void>
}
