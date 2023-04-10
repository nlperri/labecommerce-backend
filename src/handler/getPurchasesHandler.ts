import { db } from '../database/knex'

export async function getPurchasesHandler() {
  const purchases = await db('purchases')

  return purchases
}
