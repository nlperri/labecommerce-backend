import { db } from '../database/knex'

export async function getUsersHandler() {
  const users = await db('users')

  return users
}
