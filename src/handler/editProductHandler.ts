import { products } from '../database'
import AppError from '../error'
import { TProduct } from '../types'

export function editProductHandler(body: TProduct) {
  const { name, price, category, id } = body

  const newName = name || undefined
  const newPrice = price
  const newCategory = category || undefined

  const product = products.find((product) => product.id === id)

  if (!product) {
    throw new AppError('Produto não encontrada', 404)
  }

  product.name = newName || product.name
  product.price = isNaN(newPrice) ? product.price : newPrice
  product.category = newCategory || product.category
}
