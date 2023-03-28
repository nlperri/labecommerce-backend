import { users } from '../database'
import AppError from '../error'
import { TUser } from '../types'

export function createUserHandler(body: TUser) {
  const { id, email, password } = body

  if (!id || !email || !password) {
    throw new AppError('Campos inválidos', 400)
  }

  const idAlreadyExists = users.find((user) => user.id === id)

  if (idAlreadyExists) {
    throw new AppError('Id já cadastrado', 409)
  }

  const emailAlreadyExists = users.find((user) => user.email === email)

  if (emailAlreadyExists) {
    throw new AppError('E-mail já cadastrado', 409)
  }

  const newUser: TUser = {
    id,
    email,
    password,
  }

  users.push(newUser)
}
