import { Request, Response } from 'express'
import { deleteUserByIdHandler } from '../handler'

export class deleteUserByIdController {
  handle(req: Request, res: Response) {
    const id = req.params.id

    deleteUserByIdHandler(id)

    res.status(200).send('Usuário deletado com sucesso')
  }
}
