import { Request, Response } from 'express'
import { createPurchaseHandler } from '../handler'

export class createPurchaseController {
  handle(req: Request, res: Response) {
    const { userId, productId, quantity, totalPrice } = req.body

    createPurchaseHandler({ userId, productId, quantity, totalPrice })

    res.status(201).send('Compra realizada com sucesso')
  }
}
