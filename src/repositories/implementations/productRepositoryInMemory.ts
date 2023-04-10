import { products } from '../../database'
import { db } from '../../database/knex'
import { TProduct } from '../../types'
import { productRepository } from '../contracts/productRepository'

export class productRepositoryInMemory implements productRepository {
  idExists(id: string) {
    return !!products.find((product) => product.id === id)
  }
  async create(product: TProduct) {
    await db.insert(product).into('products')
  }
  async getProductById(id: string) {
    const result = await db('products').where({ id: id })

    return result
  }
  async deleteProduct(id: string) {
    await db.delete().from('products').where({ id: id })
  }
  async searchProducts(query: string) {
    const result = await db.raw(
      `SELECT * FROM products WHERE name LIKE "%${query}%"`
    )

    return result
  }
  async editProduct(product: TProduct) {
    const { id } = product
    await db('products').update(product).where({ id: id })
  }
}
