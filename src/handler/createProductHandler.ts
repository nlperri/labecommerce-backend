import { products } from '../database'
import AppError from '../error'
import { TProduct } from '../types'

export function createProductHandler(body: TProduct) {
  const { id, name, price, category } = body

  if (!id || !name || !price || !category) {
    throw new AppError('Campos inválidos', 400)
  }

  const idAlreadyExists = products.find((product) => product.id === id)

  if (idAlreadyExists) {
    throw new AppError('Id já cadastrado', 409)
  }

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  }

  products.push(newProduct)
}
