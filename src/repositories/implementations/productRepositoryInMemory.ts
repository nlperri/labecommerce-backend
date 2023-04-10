import { products } from '../../database'
import { db } from '../../database/knex'
import { TProduct } from '../../types'
import { productRepository } from '../contracts/productRepository'

export class productRepositoryInMemory implements productRepository {
  idExists(id: string) {
    return !!products.find((product) => product.id === id)
  }
  async create(product: TProduct) {
    const { id, name, price, category } = product
    await db.raw(`
    INSERT INTO products (id, name, price, category)
    VALUES ("${id}","${name}","${price}","${category}")
    `)
  }
  async getProductById(id: string) {
    const result = await db.raw(`
    SELECT * FROM products
    WHERE id = "${id}"
    `)

    return result
  }
  deleteProduct(id: string) {
    const product = products.findIndex((product) => product.id === id)

    products.splice(product, 1)
  }
  async searchProducts(query: string) {
    const result = await db.raw(
      `SELECT * FROM products WHERE name LIKE "%${query}%"`
    )

    return result
  }
}
