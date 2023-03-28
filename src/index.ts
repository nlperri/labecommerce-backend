import express, { NextFunction, Request, Response, Router } from 'express'
import cors from 'cors'
import { routerFactory } from './routes'
import AppError from './error'

const app = express()

app.use(express.json())
app.use(cors())

export const router = Router()

routerFactory()

app.use(router)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      ststus: 'error',
      message: err.message,
    })
  }
  console.log(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003')
})
