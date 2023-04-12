import { Request, Response } from 'express'
import { editUserHandler } from '../handler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { TUser } from '../types'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class editUserController {
  async handle(req: Request, res: Response) {
    const id = req.params.id
    const { email, password, name } = req.body as TUser
    const userRepository = new userRepositoryInMemory()
    const validator = new fieldValidator()

    await editUserHandler(
      { email, password, id, name },
      userRepository,
      validator
    )

    return res.status(200).send('Cadastro atualizado com sucesso')
  }
}
