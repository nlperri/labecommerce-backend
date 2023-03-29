import { Request, Response } from 'express'
import { deleteProductByIdHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'

export class deleteProductByIdController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const productRepository = new productRepositoryInMemory()

    deleteProductByIdHandler(id, productRepository)

    res.status(200).send('Produto deletado com sucesso')
  }
}
