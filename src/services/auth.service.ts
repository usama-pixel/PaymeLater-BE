import { db } from "../db"
import { user } from "../db/schema"

async function login() {

}

async function signup(fullName: string, email: string, password: string) {
    if (fullName === '' || email === '' || password === '') {
        throw new Error('Please provide all the fields')
    }
    if(!fullName || !email || !password) {
        throw new Error('Please provide all the fields')
    }
    const res = await db.insert(user).values({fullName, email, password})
    // const res = await db.insert(user).values({fullName: "usama", email: "usama@gmail.com",password: 'abc'})
    console.log(res)
    return 'res'
}

export default {
    login,
    signup
}