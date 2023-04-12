import { Request, Response } from 'express'
import { getPurchaseByIdHandle } from '../handler/getPurchaseByIdHandle'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'

export class getPurchaseByIdController {
  async handle(req: Request, res: Response) {
    const id = req.params.id
    const purchaseRepository = new purchaseRepositoryInMemory()

    const result = await getPurchaseByIdHandle(id, purchaseRepository)

    res.status(200).send(result)
  }
}
