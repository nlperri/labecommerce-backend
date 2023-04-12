import { Request, Response } from 'express'
import { deleteUserByIdHandler } from '../handler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { purchaseRepositoryInMemory } from '../repositories/implementations/purchaseRepositoryInMemory'

export class deleteUserByIdController {
  async handle(req: Request, res: Response) {
    const id = req.params.id
    const userRepository = new userRepositoryInMemory()
    const purchaseRepository = new purchaseRepositoryInMemory()

    await deleteUserByIdHandler(id, userRepository, purchaseRepository)

    res.status(200).send('Usuário deletado com sucesso')
  }
}
