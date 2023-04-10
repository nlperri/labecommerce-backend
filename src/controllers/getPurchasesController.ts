import { Request, Response } from 'express'
import { getPurchasesHandler } from '../handler/getPurchasesHandler'

export class getPurchasesController {
  async handle(req: Request, res: Response) {
    const purchases = await getPurchasesHandler()

    res.status(200).send(purchases)
  }
}
