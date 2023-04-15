import { Request, Response } from 'express'
import { getProductsHandler } from '../handler/getProductsHandler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'

export class getProductsController {
  async handle(req: Request, res: Response) {
    const productRepository = new productRepositoryInMemory()
    const products = await getProductsHandler(productRepository)

    res.status(200).send(products)
  }
}
