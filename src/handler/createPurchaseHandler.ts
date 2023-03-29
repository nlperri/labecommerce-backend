import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchase } from '../types'
import { validator } from '../validators/contracts/validator'

export function createPurchaseHandler(
  body: TPurchase,
  purchaseRepository: purchaseRepository,
  userRepository: userRepository,
  productRepository: productRepository,
  fieldValidator: validator
) {
  const { userId, productId, quantity, totalPrice } = body

  if (!userId || !productId || !quantity || !totalPrice) {
    throw new AppError('Campos inválidos', 400)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    {
      key: 'user id',
      value: userId,
    },
    {
      key: 'product id',
      value: productId,
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
      key: 'quantity',
      value: quantity,
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

  const userExists = userRepository.idExists(userId)

  if (!userExists) {
    throw new AppError('Usuário não encontrado', 400)
  }

  const product = productRepository.getProductById(productId)

  if (!product) {
    throw new AppError('Produto não encontrado', 400)
  }

  if (product.price * quantity !== totalPrice) {
    throw new AppError(
      'Preço total deve ser equivalente ao preço do produto e a quantidade adicionada a compra',
      400
    )
  }

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  }

  purchaseRepository.create(newPurchase)
}
