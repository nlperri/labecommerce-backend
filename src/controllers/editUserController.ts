import { Request, Response } from 'express'
import { editUserHandler } from '../handler'
import { TUser } from '../types'

export class editUserController {
  handle(req: Request, res: Response) {
    const id = req.params.id
    const { email, password } = req.body as TUser

    editUserHandler({ email, password, id })

    return res.status(200).send('Cadastro atualizado com sucesso')
  }
}
