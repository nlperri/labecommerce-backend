import { db } from '../database/knex'

export async function getPurchasesHandler() {
  const purchases = await db.raw(`SELECT * FROM purchases`)

  return purchases
}
