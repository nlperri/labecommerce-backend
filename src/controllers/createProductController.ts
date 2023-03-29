import { Request, Response } from 'express'
import { createProductHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'
import { TProduct } from '../types'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class createProductController {
  handle(req: Request, res: Response) {
    const { category, id, name, price } = req.body as TProduct
    const productRepository = new productRepositoryInMemory()
    const validator = new fieldValidator()

    createProductHandler(
      { category, id, name, price },
      productRepository,
      validator
    )

    res.status(201).send('Produto cadastrado com sucesso')
  }
}
