import { Request, Response } from 'express'
import { getUserPurchasesHandler } from '../handler'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'

export class getUserPurchasesController {
  async handle(req: Request, res: Response) {
    const id = req.params.id
    const purchaseRepository = new purchaseRepositoryInMemory()
    const userRepository = new userRepositoryInMemory()

    const userPurchases = await getUserPurchasesHandler(
      id,
      purchaseRepository,
      userRepository
    )
    res.status(200).send(userPurchases)
  }
}
