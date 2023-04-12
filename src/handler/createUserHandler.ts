import { ifError } from 'assert'
import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { validator } from '../validators/contracts/validator'

export async function createUserHandler(
  body: TUser,
  userRepository: userRepository,
  fieldValidator: validator
) {
  const { id, email, password, name } = body

  if (!id || !email || !password || !name) {
    throw new AppError('Campos inválidos', 400)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    {
      key: 'id',
      value: id,
    },
    {
      key: 'email',
      value: email,
    },
    {
      key: 'password',
      value: password,
    },
    {
      key: 'name',
      value: name,
    },
  ])

  if (!validatedStrings.isValid) {
    throw new AppError(
      `O campo ${validatedStrings.failedField} deve ser do tipo string`,
      400
    )
  }

  const idAlreadyExists = await userRepository.idExists(id)

  if (idAlreadyExists) {
    throw new AppError('Id já cadastrado', 409)
  }

  const emailAlreadyExists = await userRepository.emailExists(email)

  if (emailAlreadyExists) {
    throw new AppError('E-mail já cadastrado', 409)
  }

  const newUser: TUser = {
    id,
    email,
    password,
    name,
  }

  await userRepository.create(newUser)
}
