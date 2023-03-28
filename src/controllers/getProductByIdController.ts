import { Request, Response } from 'express'
import { getProductByIdHandler } from '../handler'

export class getProductByIdController {
  handle(req: Request, res: Response) {
    const id = req.params.id

    const productToFind = getProductByIdHandler(id)

    res.status(200).send(productToFind)
  }
}
