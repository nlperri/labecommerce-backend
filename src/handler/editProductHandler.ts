import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { CATEGORY, TProduct } from '../types'
import { validator } from '../validators/contracts/validator'

export function editProductHandler(
  body: TProduct,
  productRepository: productRepository,
  fieldValidator: validator
) {
  const { name, price, category, id } = body

  if (!body) {
    throw new AppError('Campo inválido', 400)
  }

  const newName = name || undefined
  const newPrice = price
  const newCategory = category || undefined

  const product = productRepository.getProductById(id)

  if (!product) {
    throw new AppError('Produto não encontrado', 404)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    {
      key: 'name',
      value: newName,
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
      key: 'price',
      value: newPrice,
    },
  ])

  if (!validatedNumbers.isValid) {
    throw new AppError(
      `O campo ${validatedNumbers.failedField} deve ser do tipo number`,
      400
    )
  }

  if (newCategory !== undefined) {
    if (
      newCategory !== CATEGORY.ACCESSORIES &&
      newCategory !== CATEGORY.CLOTHES_AND_SHOES &&
      newCategory !== CATEGORY.ELECTRONICS
    ) {
      throw new AppError('Categoria inválida', 400)
    }
  }

  product.name = newName || product.name
  product.price = isNaN(newPrice) ? product.price : newPrice
  product.category = newCategory || product.category
}
