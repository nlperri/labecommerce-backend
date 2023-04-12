import { CATEGORY } from '../types'
import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { validator } from '../validators/contracts/validator'

export async function createProductHandler(
  body: TProduct,
  productRepository: productRepository,
  fieldValidator: validator
) {
  const { id, name, price, description, imageUrl } = body

  if (!id || !name || !price || !description || !imageUrl) {
    throw new AppError('Campos inválidos', 400)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    { key: 'id', value: id },
    { key: 'name', value: name },
    { key: 'description', value: description },
    { key: 'imageUrl', value: imageUrl },
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

  const idAlreadyExists = await productRepository.idExists(id)
  if (idAlreadyExists) {
    throw new AppError('Id já cadastrado', 409)
  }

  const newProduct: TProduct = {
    id,
    name,
    price,
    description,
    imageUrl,
  }

  await productRepository.create(newProduct)
}
