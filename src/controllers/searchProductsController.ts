import { Request, Response } from 'express'
import { searchProductsHandler } from '../handler'

export class searchProductsController {
  handle(req: Request, res: Response) {
    const query = req.query.q as string
    const result = searchProductsHandler(query)

    res.status(200).send(result)
  }
}
