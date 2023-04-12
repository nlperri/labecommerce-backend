import { TProduct } from '../../types'

export interface productRepository {
  idExists: (id: string) => Promise<boolean>
  create: (product: TProduct) => Promise<void>
  getProductById: (id: string) => Promise<TProduct | undefined>
  deleteProduct: (id: string) => Promise<void>
  searchProducts: (query: string) => Promise<TProduct[] | []>
  editProduct: (product: TProduct) => Promise<void>
}
