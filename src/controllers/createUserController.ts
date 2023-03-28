import { Request, Response } from 'express'
import { createUserHandler } from '../handler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'
import { TUser } from '../types'

export class createUserController {
  handle(req: Request, res: Response) {
    const { id, email, password } = req.body as TUser
    const userRepository = new userRepositoryInMemory()

    createUserHandler({ id, email, password }, userRepository)

    res.status(201).send('Usuário cadastrado com sucesso')
  }
}
