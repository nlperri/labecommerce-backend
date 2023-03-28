import { products } from '../database'
import AppError from '../error'

export function deleteProductByIdHandler(id: string) {
  const productToDelete = products.findIndex((product) => product.id === id)

  if (productToDelete === -1) {
    throw new AppError('Produto não encontrado', 404)
  }

  products.splice(productToDelete, 1)
}
