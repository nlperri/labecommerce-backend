import { TPurchase } from '../../types'

export interface purchaseRepository {
  getPurchases: () => Promise<TPurchase[] | []>
  getUserPurchases: (id: string) => Promise<TPurchase[] | []>
  create: (purchase: TPurchase) => Promise<void>
  idExists: (id: string) => Promise<boolean>
  getPurchaseById: (id: string) => Promise<any>
  deletePurchaseById: (id: string) => Promise<void>
  deletePurchaseFromPurchasesProducts: (id: string) => Promise<void>
  createPurchasesProducts: (
    id: string,
    productId: string,
    quantity: number
  ) => Promise<void>
}
