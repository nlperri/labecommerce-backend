import { Request, Response } from 'express'
import { getProductsHandler } from '../handler/getProductsHandler'

export class getProductsController {
  async handle(req: Request, res: Response) {
    const products = await getProductsHandler()

    res.status(200).send(products)
  }
}
