import { db } from '../database/knex'

export async function getProductsHandler() {
  const products = await db('products')

  return products
}
