import express from 'express'
import * as dotenv from 'dotenv'
import { user } from './db/schema'
import { db } from './db'

dotenv.config()
const app = express()

// async function main() {
//     await db.insert(user).values({fullName: "usama", email: "usama@gmail.com", address: "abc", phone: "090078601"})
//     console.log('data inserted')
// }
// main().catch(err => console.log(err))

app.listen(3000, () => {
    console.log('listening on port 3000')
})