import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { validator } from '../validators/contracts/validator'

export async function editUserHandler(
  body: TUser,
  userRepository: userRepository,
  fieldValidator: validator
) {
  const { email, password, id, name } = body

  const newEmail = email || undefined
  const newPassword = password || undefined
  const newName = name || undefined

  const user = await userRepository.getUserById(id)

  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    {
      key: 'email',
      value: newEmail,
    },
    {
      key: 'password',
      value: newPassword,
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

  const newUser = {
    email: newEmail || user.email,
    password: newPassword || user.password,
    id,
    name: newName || user.name,
  }

  userRepository.editUser(newUser)
}
