import { TProduct } from '../../types'

export interface productRepository {
  idExists: (id: string) => boolean
  create: (product: TProduct) => Promise<void>
  getProductById: (id: string) => Promise<TProduct[] | []>
  deleteProduct: (id: string) => void
  searchProducts: (query: string) => Promise<TProduct[] | []>
}
