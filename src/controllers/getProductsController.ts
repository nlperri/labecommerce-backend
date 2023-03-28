import { Request, Response } from 'express'
import { getProductsHandler } from '../handler/getProductsHandler'

export class getProductsController {
  handle(req: Request, res: Response) {
    const products = getProductsHandler()

    res.status(200).send(products)
  }
}
