import { users } from '../../database'
import { TUser } from '../../types'
import { userRepository } from '../contracts/userRepository'

export class userRepositoryInMemory implements userRepository {
  getUserById(id: string) {
    return users.find((user) => user.id === id)
  }
  deleteUser(id: string) {
    const user = users.findIndex((user) => user.id === id)

    return users.splice(user, 1)
  }
  idExists(id: string): boolean {
    return !!users.find((user) => user.id === id)
  }
  emailExists(email: string): boolean {
    return !!users.find((user) => user.email === email)
  }
  create(user: TUser): void {
    users.push(user)
  }
}
