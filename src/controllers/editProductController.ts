import { Request, Response } from 'express'
import { editProductHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'
import { TProduct } from '../types'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class editProductController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const { name, price, category } = req.body as TProduct
    const productRepository = new productRepositoryInMemory()
    const validator = new fieldValidator()

    editProductHandler(
      { id, name, price, category },
      productRepository,
      validator
    )

    res.status(200).send('Produto atualizado com sucesso')
  }
}
