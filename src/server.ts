import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { user } from './db/schema'
import { db } from './db'
import { router as authRouter } from './routes/auth.routes'

dotenv.config()
const app = express()

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log({err})
    res.json("some error occured")
})
app.use(express.json())
app.use(authRouter)
// async function main() {
//     await db.insert(user).values({fullName: "usama", email: "usama@gmail.com", address: "abc", phone: "090078601"})
//     console.log('data inserted')
// }
// main().catch(err => console.log(err))

app.listen(3000, () => {
    console.log('listening on port 3000')
})