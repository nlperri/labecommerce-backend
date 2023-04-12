import { users } from '../../database'
import { db } from '../../database/knex'
import { TUser } from '../../types'
import { userRepository } from '../contracts/userRepository'

export class userRepositoryInMemory implements userRepository {
  async getUserById(id: string) {
    const [result] = await db<TUser>('users').where({ id: id })
    return result
  }
  async deleteUser(id: string) {
    await db('users').del().where({ id: id })
  }
  async deleteUserFromPurchases(id: string) {
    await db.delete().from('purchases').where({ buyer_id: id })
  }

  async idExists(id: string) {
    const [result]: TUser[] = await db('users').where({ id: id })
    return !!result
  }
  async emailExists(email: string) {
    const [result]: TUser[] = await db('users').where({ email: email })
    return !!result
  }
  async create(user: TUser) {
    await db.insert(user).into('users')
  }
  async editUser(user: TUser) {
    const { id } = user
    await db('users').update(user).where({ id: id })
  }
}
