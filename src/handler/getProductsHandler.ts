import { db } from '../database/knex'
import { productRepository } from '../repositories/contracts/productRepository'

export async function getProductsHandler(productRepository: productRepository) {
  const products = productRepository.getProducts()

  return products
}
