import AppError from '../error'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { validator } from '../validators/contracts/validator'

export async function editUserHandler(
  body: TUser,
  userRepository: userRepository,
  fieldValidator: validator
) {
  const { email, password, id } = body

  const newEmail = email || undefined
  const newPassword = password || undefined

  const user = await userRepository.getUserById(id)

  if (user.length === 0) {
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

  const newUser = {
    email: newEmail || user[0].email,
    password: newPassword || user[0].password,
    id,
  }

  userRepository.editUser(newUser)
}
