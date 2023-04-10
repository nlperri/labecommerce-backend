import { db } from '../database/knex'

export async function getProductsHandler() {
  const products = await db.raw(`
  SELECT * FROM products`)

  return products
}
