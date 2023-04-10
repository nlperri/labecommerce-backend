import { Request, Response } from 'express'
import { searchProductsHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'

export class searchProductsController {
  async handle(req: Request, res: Response) {
    const query = req.query.q as string
    const productRepository = new productRepositoryInMemory()
    const result = await searchProductsHandler(query, productRepository)

    res.status(200).json(result)
  }
}
