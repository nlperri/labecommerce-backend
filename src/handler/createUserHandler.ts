import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'

import { TUser } from '../types'

export function createUserHandler(body: TUser, userRepository: userRepository) {
  const { id, email, password } = body

  if (!id || !email || !password) {
    throw new AppError('Campos inválidos', 400)
  }

  const idAlreadyExists = userRepository.idExists(id)

  if (idAlreadyExists) {
    throw new AppError('Id já cadastrado', 409)
  }

  const emailAlreadyExists = userRepository.emailExists(email)

  if (emailAlreadyExists) {
    throw new AppError('E-mail já cadastrado', 409)
  }

  const newUser: TUser = {
    id,
    email,
    password,
  }

  userRepository.create(newUser)
}
