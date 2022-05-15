import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import 'express-async-errors'

import { AppError } from "./errors/AppError";
import { routes } from "./routes";

const app = express()

app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ limit: '200mb', extended: true }))

app.use(routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})


app.listen(process.env.PORT || 3333, () => console.log('HTTP server running'))