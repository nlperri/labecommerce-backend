import { Request, Response } from 'express'
import { createUserHandler } from '../handler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { TUser } from '../types'
import { fieldValidator } from '../validators/implementations/fieldValidator'

export class createUserController {
  handle(req: Request, res: Response) {
    const { id, email, password } = req.body as TUser
    const userRepository = new userRepositoryInMemory()
    const validator = new fieldValidator()

    createUserHandler({ id, email, password }, userRepository, validator)

    res.status(201).send('Usuário cadastrado com sucesso')
  }
}
