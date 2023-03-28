import { Request, Response } from 'express'
import { getUserPurchasesHandler } from '../handler'

export class getUserPurchasesController {
  handle(req: Request, res: Response) {
    const id = req.params.id

    const userPurchases = getUserPurchasesHandler(id)

    res.status(200).send(userPurchases)
  }
}
