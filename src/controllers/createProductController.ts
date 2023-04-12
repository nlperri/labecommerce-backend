import { Request, Response } from 'express'
import { createProductHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'
import { TProduct } from '../types'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class createProductController {
  async handle(req: Request, res: Response) {
    const { imageUrl, description, id, name, price } = req.body as TProduct
    const productRepository = new productRepositoryInMemory()
    const validator = new fieldValidator()

    await createProductHandler(
      { description, imageUrl, id, name, price },
      productRepository,
      validator
    )

    res.status(201).send('Produto cadastrado com sucesso')
  }
}
