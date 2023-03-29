import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'

export function deleteProductByIdHandler(
  id: string,
  productRepository: productRepository
) {
  const productToDelete = productRepository.getProductById(id)

  if (!productToDelete) {
    throw new AppError('Produto não encontrado', 404)
  }

  productRepository.deleteProduct(id)
}
