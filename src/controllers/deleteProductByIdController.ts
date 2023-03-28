import { Request, Response } from 'express'
import { deleteProductByIdHandler } from '../handler'

export class deleteProductByIdController {
  handle(req: Request, res: Response) {
    const id = req.params.id

    deleteProductByIdHandler(id)

    res.status(200).send('Produto deletado com sucesso')
  }
}
