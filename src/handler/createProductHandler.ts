import { CATEGORY } from '../types'
import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { validator } from '../validators/contracts/validator'

export function createProductHandler(
  body: TProduct,
  productRepository: productRepository,
  fieldValidator: validator
) {
  const { id, name, price, category } = body

  if (!id || !name || !price || !category) {
    throw new AppError('Campos inválidos', 400)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    { key: 'id', value: id },
    { key: 'name', value: name },
  ])

  if (!validatedStrings.isValid) {
    throw new AppError(
      `O campo ${validatedStrings.failedField} deve ser do tipo string`,
      400
    )
  }

  const validatedNumbers = fieldValidator.isFieldsNumbers([
    { key: 'price', value: price },
  ])

  if (!validatedNumbers.isValid) {
    throw new AppError(
      `O campo ${validatedNumbers.failedField} deve ser do tipo number`,
      400
    )
  }

  if (
    category !== CATEGORY.ACCESSORIES &&
    category !== CATEGORY.CLOTHES_AND_SHOES &&
    category !== CATEGORY.ELECTRONICS
  ) {
    throw new AppError('Category inválido', 400)
  }

  const idAlreadyExists = productRepository.idExists(id)
  if (idAlreadyExists) {
    throw new AppError('Id já cadastrado', 409)
  }

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  }

  productRepository.create(newProduct)
}
