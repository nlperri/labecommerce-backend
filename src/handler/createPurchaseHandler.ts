import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TProduct, TProductInput, TPurchase } from '../types'
import { validator } from '../validators/contracts/validator'

export async function createPurchaseHandler(
  body: TPurchase,
  products: TProductInput[],
  productRepository: productRepository,
  purchaseRepository: purchaseRepository,
  userRepository: userRepository,
  fieldValidator: validator
) {
  const { userId, id, paid } = body

  if (!userId || !id || (paid !== 0 && paid !== 1) || products.length === 0) {
    throw new AppError('Campos inválidos', 400)
  }

  products.forEach((product) => {
    if (!product.productId || !product.quantity) {
      throw new AppError('Campos inválidos', 400)
    }
  })

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

  products.forEach((product) => {
    let isString
    let isNumber

    isString = fieldValidator.isFieldsStrings([
      {
        key: 'productId',
        value: product.productId,
      },
    ])

    if (!isString.isValid) {
      throw new AppError(
        `O campo ${isString.failedField} deve ser do tipo string`,
        400
      )
    }

    isNumber = fieldValidator.isFieldsNumbers([
      {
        key: 'quantity',
        value: product.quantity,
      },
    ])

    if (!isNumber.isValid) {
      throw new AppError(
        `O campo ${isNumber.failedField} deve ser do tipo number`
      )
    }
  })

  const validatedNumbers = fieldValidator.isFieldsNumbers([
    {
      key: 'paid',
      value: paid,
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

  const returnedProducts = await Promise.all(
    products.map(async (product) => {
      return await productRepository.getProductById(product.productId)
    })
  )

  if (returnedProducts.length === 0) {
    throw new AppError('Produto não encontrado', 404)
  }

  const productsQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  )

  const productsPrice = returnedProducts.reduce((acc, product) => {
    if (!product) return acc
    return acc + product.price
  }, 0)

  const totalPrice = productsQuantity * productsPrice

  const newPurchase: TPurchase = {
    userId,
    id,
    paid,
    totalPrice,
  }

  await purchaseRepository.create(newPurchase)

  products.forEach(async (product) => {
    await purchaseRepository.createPurchasesProducts(
      id,
      product.productId,
      product.quantity
    )
  })
}
