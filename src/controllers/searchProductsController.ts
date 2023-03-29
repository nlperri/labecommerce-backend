import { Request, Response } from 'express'
import { searchProductsHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'

export class searchProductsController {
  handle(req: Request, res: Response) {
    const query = req.query.q as string
    const productRepository = new productRepositoryInMemory()
    const result = searchProductsHandler(query, productRepository)

    res.status(200).send(result)
  }
}
