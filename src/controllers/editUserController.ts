import { Request, Response } from 'express'
import { editUserHandler } from '../handler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { TUser } from '../types'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class editUserController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const { email, password } = req.body as TUser
    const userRepository = new userRepositoryInMemory()
    const validator = new fieldValidator()

    editUserHandler({ email, password, id }, userRepository, validator)

    return res.status(200).send('Cadastro atualizado com sucesso')
  }
}
