import { TProduct } from '../../types'

export interface productRepository {
  idExists: (id: string) => boolean
  create: (product: TProduct) => void
  getProductById: (id: string) => TProduct | undefined
  deleteProduct: (id: string) => void
  searchProducts: (query: string) => TProduct[]
}
