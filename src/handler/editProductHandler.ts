import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'

export function editProductHandler(
  body: TProduct,
  productRepository: productRepository
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

  product.name = newName || product.name
  product.price = isNaN(newPrice) ? product.price : newPrice
  product.category = newCategory || product.category
}
