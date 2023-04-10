import { users } from '../../database'
import { db } from '../../database/knex'
import { TUser } from '../../types'
import { userRepository } from '../contracts/userRepository'

export class userRepositoryInMemory implements userRepository {
  getUserById(id: string) {
    return users.find((user) => user.id === id)
  }
  deleteUser(id: string) {
    const user = users.findIndex((user) => user.id === id)

    users.splice(user, 1)
  }
  async idExists(id: string) {
    const result: TUser[] = await db.raw(`
    SELECT * FROM users
    WHERE id = "${id}"
    `)
    return !!result.length
  }
  emailExists(email: string) {
    return !!users.find((user) => user.email === email)
  }
  async create(user: TUser) {
    const { id, email, password } = user

    await db.raw(`
    INSERT INTO users (id, email, password)
    VALUES ("${id}","${email}","${password}")
    `)
  }
}
