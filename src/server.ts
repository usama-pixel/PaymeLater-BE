import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { router as authRouter } from './routes/auth.routes'
import { router as clientRouter } from './routes/client.routes'
import passport from 'passport'
import passportSetup, { validateUser } from './utils/auth'

import cors from 'cors'
import { isPast } from 'date-fns'
dotenv.config()

if(isPast(new Date(2025, 1))) {
    console.log('date is past')
}

const app = express()
app.use(cors())
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log({err})
    res.json("some error occured")
})
app.use(express.json())
app.use(passport.initialize())

app.use(authRouter)
// app.use(validateUser)
app.use(clientRouter)

app.listen(3000, () => {
    console.log('listening on port 3000')
})