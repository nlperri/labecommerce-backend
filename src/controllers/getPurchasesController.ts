import { Request, Response } from 'express'
import { getPurchasesHandler } from '../handler/getPurchasesHandler'

export class getPurchasesController {
  handle(req: Request, res: Response) {
    const purchases = getPurchasesHandler()

    res.status(200).send(purchases)
  }
}
