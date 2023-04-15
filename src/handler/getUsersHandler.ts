import { db } from '../database/knex'
import { userRepository } from '../repositories/contracts/userRepository'

export async function getUsersHandler(userRepository: userRepository) {
  const users = userRepository.getUsers()

  return users
}
