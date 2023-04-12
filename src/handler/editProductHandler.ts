import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { validator } from '../validators/contracts/validator'

export async function editProductHandler(
  body: TProduct,
  productRepository: productRepository,
  fieldValidator: validator
) {
  const { name, price, description, id, imageUrl } = body

  if (!body) {
    throw new AppError('Campo inválido', 400)
  }

  const newName = name || undefined
  const newPrice = price
  const newDescription = description || undefined
  const newImageUrl = imageUrl || undefined

  const product = await productRepository.getProductById(id)

  if (!product) {
    throw new AppError('Produto não encontrado', 404)
  }

  const validatedStrings = fieldValidator.isFieldsStrings([
    {
      key: 'name',
      value: newName,
    },
    {
      key: 'description',
      value: newDescription,
    },
    {
      key: 'imageUrl',
      value: newImageUrl,
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

  const newProduct = {
    name: newName || product.name,
    price: newPrice || product.price,
    description: newDescription || product.description,
    imageUrl: newImageUrl || product.imageUrl,
    id,
  }

  await productRepository.editProduct(newProduct)
}
