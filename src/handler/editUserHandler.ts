import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { validator } from '../validators/contracts/validator'

export function editUserHandler(
  body: TUser,
  userRepository: userRepository,
  fieldValidator: validator
) {
  const { email, password, id } = body

  const newEmail = email || undefined
  const newPassword = password || undefined

  const user = userRepository.getUserById(id)

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
  ])

  if (!validatedStrings.isValid) {
    throw new AppError(
      `O campo ${validatedStrings.failedField} deve ser do tipo string`,
      400
    )
  }

  user.password = newPassword || user.password
  user.email = newEmail || user.email
}
