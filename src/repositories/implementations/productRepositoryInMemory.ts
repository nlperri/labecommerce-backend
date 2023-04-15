import { products } from '../../database'
import { db } from '../../database/knex'
import { TProduct } from '../../types'
import { productRepository } from '../contracts/productRepository'

export class productRepositoryInMemory implements productRepository {
  async getProducts() {
    const result = await db('products')
    return result
  }
  async idExists(id: string) {
    const [result]: TProduct[] = await db('products').where({ id: id })
    return !!result
  }
  async create(product: TProduct) {
    const { id, name, price, description, imageUrl } = product

    const newProduct = {
      id,
      name,
      price,
      description,
      image_url: imageUrl,
    }
    await db.insert(newProduct).into('products')
  }
  async getProductById(id: string) {
    const [result] = await db('products').where({ id: id })

    return result
  }
  async deleteProduct(id: string) {
    await db.delete().from('products').where({ id: id })
  }
  async deleteProductFromPurchasesProducts(id: string) {
    await db.delete().from('purchases_products').where({ product_id: id })
  }
  async searchProducts(query: string) {
    const result = await db('products').where('name', 'like', `%${query}%`)

    return result
  }
  async editProduct(product: TProduct) {
    const { id } = product
    await db('products').update(product).where({ id: id })
  }
}
