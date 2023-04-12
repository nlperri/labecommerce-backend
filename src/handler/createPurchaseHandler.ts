import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchase } from '../types'
import { validator } from '../validators/contracts/validator'

export async function createPurchaseHandler(
  body: TPurchase,
  quantity: number,
  productId: string,
  productRepository: productRepository,
  purchaseRepository: purchaseRepository,
  userRepository: userRepository,
  fieldValidator: validator
) {
  const { userId, id, paid } = body

  if (!userId || !id || !paid || !productId || !quantity) {
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
    {
      key: 'productId',
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
      key: 'paid',
      value: paid,
    },
    {
      key: 'quantity',
      value: quantity,
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
    throw new AppError('Usuário não encontrado', 404)
  }

  const purchaseIdExists = await purchaseRepository.idExists(id)

  if (purchaseIdExists) {
    throw new AppError('Id de compra já cadastrado')
  }

  if (paid !== 0 && paid !== 1) {
    throw new AppError('Paid deve ser 0 ou 1', 400)
  }

  const product = await productRepository.getProductById(productId)

  if (!product) {
    throw new AppError('Produto não encontrado', 404)
  }

  const totalPrice = product.price * quantity

  const newPurchase: TPurchase = {
    userId,
    id,
    paid,
    totalPrice,
  }

  await purchaseRepository.create(newPurchase)

  await purchaseRepository.createPurchasesProducts(id, productId, quantity)
}
