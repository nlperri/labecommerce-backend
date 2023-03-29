import { Request, Response } from 'express'
import { getUserPurchasesHandler } from '../handler'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'

export class getUserPurchasesController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const purchaseRepository = new purchaseRepositoryInMemory()

    const userPurchases = getUserPurchasesHandler(id, purchaseRepository)
    res.status(200).send(userPurchases)
  }
}
