import { Request, Response } from 'express'
import { getUsersHandler } from '../handler/getUsersHandler'

export class getUsersController {
  handle(req: Request, res: Response) {
    const users = getUsersHandler()

    res.status(200).send(users)
  }
}
