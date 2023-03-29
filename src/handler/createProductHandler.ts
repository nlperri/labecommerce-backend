import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'

export function createProductHandler(
  body: TProduct,
  productRepository: productRepository
) {
  const { id, name, price, category } = body

  if (!id || !name || !price || !category) {
    throw new AppError('Campos inválidos', 400)
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
