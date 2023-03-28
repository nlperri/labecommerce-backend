import { Request, Response } from 'express'
import { createUserHandler } from '../handler'
import { TUser } from '../types'

export class createUserController {
  handle(req: Request, res: Response) {
    const { id, email, password } = req.body as TUser

    createUserHandler({ id, email, password })

    res.status(201).send('Usuário cadastrado com sucesso')
  }
}
