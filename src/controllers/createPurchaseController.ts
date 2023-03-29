import { Request, Response } from 'express'
import { createPurchaseHandler } from '../handler'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class createPurchaseController {
  handle(req: Request, res: Response) {
    const { userId, productId, quantity, totalPrice } = req.body
    const purchaseRepository = new purchaseRepositoryInMemory()
    const userRepository = new userRepositoryInMemory()
    const productRepository = new productRepositoryInMemory()
    const validator = new fieldValidator()

    createPurchaseHandler(
      { userId, productId, quantity, totalPrice },
      purchaseRepository,
      userRepository,
      productRepository,
      validator
    )

    res.status(201).send('Compra realizada com sucesso')
  }
}
