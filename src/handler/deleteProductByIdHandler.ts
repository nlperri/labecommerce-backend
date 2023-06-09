import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'

export async function deleteProductByIdHandler(
  id: string,
  productRepository: productRepository
) {
  const productToDelete = await productRepository.getProductById(id)

  if (!productToDelete) {
    throw new AppError('Produto não encontrado', 404)
  }

  await productRepository.deleteProductFromPurchasesProducts(id)

  await productRepository.deleteProduct(id)
}
