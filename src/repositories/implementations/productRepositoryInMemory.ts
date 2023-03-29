import { products } from '../../database'
import { TProduct } from '../../types'
import { productRepository } from '../contracts/productRepository'

export class productRepositoryInMemory implements productRepository {
  idExists(id: string): boolean {
    return !!products.find((product) => product.id === id)
  }
  create(product: TProduct): void {
    products.push(product)
  }
  getProductById(id: string): TProduct | undefined {
    return products.find((product) => product.id === id)
  }
  deleteProduct(id: string): void {
    const product = products.findIndex((product) => product.id === id)

    products.splice(product, 1)
  }
  searchProducts(query: string): TProduct[] {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
  }
}
