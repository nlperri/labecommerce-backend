import { Request, Response } from 'express'
import { deleteUserByIdHandler } from '../handler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'

export class deleteUserByIdController {
  async handle(req: Request, res: Response) {
    const id = req.params.id
    const userRepository = new userRepositoryInMemory()

    await deleteUserByIdHandler(id, userRepository)

    res.status(200).send('Usuário deletado com sucesso')
  }
}
