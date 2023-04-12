import { Request, Response } from 'express'
import { createPurchaseHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class createPurchaseController {
  async handle(req: Request, res: Response) {
    const { userId, id, paid, productId, quantity } = req.body
    const purchaseRepository = new purchaseRepositoryInMemory()
    const userRepository = new userRepositoryInMemory()
    const productRepository = new productRepositoryInMemory()
    const validator = new fieldValidator()

    await createPurchaseHandler(
      { userId, id, paid },
      quantity,
      productId,
      productRepository,
      purchaseRepository,
      userRepository,
      validator
    )

    res.status(201).send('Compra realizada com sucesso')
  }
}
