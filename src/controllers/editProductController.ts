import { Request, Response } from 'express'
import { editProductHandler } from '../handler'
import { TProduct } from '../types'

export class editProductController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const { name, price, category } = req.body as TProduct

    editProductHandler({ id, name, price, category })

    res.status(200).send('Produto atualizado com sucesso')
  }
}
