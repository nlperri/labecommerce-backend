import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'

export async function getProductByIdHandler(
  id: string,
  productRepository: productRepository
) {
  const productToFind = await productRepository.getProductById(id)

  if (!productToFind) {
    throw new AppError('Produto não encontrado', 404)
  }

  return productToFind
}
