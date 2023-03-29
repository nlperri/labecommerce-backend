import { Request, Response } from 'express'
import { getProductByIdHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'

export class getProductByIdController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const productRepository = new productRepositoryInMemory()

    const productToFind = getProductByIdHandler(id, productRepository)

    res.status(200).send(productToFind)
  }
}
