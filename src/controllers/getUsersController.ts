import { Request, Response } from 'express'
import { getUsersHandler } from '../handler/getUsersHandler'

export class getUsersController {
  async handle(req: Request, res: Response) {
    const users = await getUsersHandler()

    res.status(200).send(users)
  }
}
