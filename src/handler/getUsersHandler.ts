import { db } from '../database/knex'

export async function getUsersHandler() {
  const users = await db.raw(`SELECT * FROM users`)

  return users
}
