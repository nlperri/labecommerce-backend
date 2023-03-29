import { Request, Response } from 'express'
import { createPurchaseHandler } from '../handler'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'

export class createPurchaseController {
  handle(req: Request, res: Response) {
    const { userId, productId, quantity, totalPrice } = req.body
    const purchaseRepository = new purchaseRepositoryInMemory()

    createPurchaseHandler(
      { userId, productId, quantity, totalPrice },
      purchaseRepository
    )

    res.status(201).send('Compra realizada com sucesso')
  }
}
