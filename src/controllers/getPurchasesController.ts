import { Request, Response } from 'express'
import { getPurchasesHandler } from '../handler/getPurchasesHandler'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'

export class getPurchasesController {
  async handle(req: Request, res: Response) {
    const purchaseRepository = new purchaseRepositoryInMemory()
    const purchases = await getPurchasesHandler(purchaseRepository)

    res.status(200).send(purchases)
  }
}
