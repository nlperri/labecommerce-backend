import { Request, Response } from 'express'
import { getUsersHandler } from '../handler/getUsersHandler'
import { userRepositoryInMemory } from '../repositories/implementations/userRepositoryInMemory'

export class getUsersController {
  async handle(req: Request, res: Response) {
    const userRepository = new userRepositoryInMemory()
    const users = await getUsersHandler(userRepository)

    res.status(200).send(users)
  }
}
