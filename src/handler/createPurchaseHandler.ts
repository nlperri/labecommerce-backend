import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchase } from '../types'
import { validator } from '../validators/contracts/validator'

export async function createPurchaseHandler(
  body: TPurchase,
  purchaseRepository: purchaseRepository,
  userRepository: userRepository,
  productRepository: productRepository,
  fieldValidator: validator
) {
  const { userId, id, totalPrice, paid } = body

  if (!userId || !id || !paid || !totalPrice) {
    throw new AppError('Campos inválidos', 400)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    {
      key: 'user id',
      value: userId,
    },
    {
      key: 'id',
      value: id,
    },
  ])

  if (!validatedStrings.isValid) {
    throw new AppError(
      `O campo ${validatedStrings.failedField} deve ser do tipo string`,
      400
    )
  }

  const validatedNumbers = fieldValidator.isFieldsNumbers([
    {
      key: 'paid',
      value: paid,
    },
    {
      key: 'total price',
      value: totalPrice,
    },
  ])

  if (!validatedNumbers.isValid) {
    throw new AppError(
      `O campo ${validatedNumbers.failedField} deve ser do tipo number`,
      400
    )
  }

  const userExists = await userRepository.idExists(userId)

  if (!userExists) {
    throw new AppError('Usuário não encontrado', 400)
  }

  if (paid !== 0 && paid !== 1) {
    throw new AppError('Paid deve ser 0 ou 1', 400)
  }

  const newPurchase: TPurchase = {
    userId,
    id,
    paid,
    totalPrice,
  }

  await purchaseRepository.create(newPurchase)
}
