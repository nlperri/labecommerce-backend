import { Request, Response } from 'express'
import { createProductHandler } from '../handler'
import { TProduct } from '../types'

export class createProductController {
  handle(req: Request, res: Response) {
    const { category, id, name, price } = req.body as TProduct

    createProductHandler({ category, id, name, price })

    res.status(201).send('Produto cadastrado com sucesso')
  }
}
