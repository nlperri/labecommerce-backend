import 'reflect-metadata'
import express, { NextFunction, Request, Response, Router } from 'express'
import 'express-async-errors'
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
  console.log(err)
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: response.statusCode,
      message: err.message,
    })
  }
  return response.status(500).json({
    status: response.statusCode,
    message: 'Internal server error',
  })
})

export { app }
