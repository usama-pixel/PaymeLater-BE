import passport from "passport"
import { db } from "../db"
import { users } from "../db/schema"
import * as jwt from 'jsonwebtoken'

async function login() {

}

async function signup(fullName: string, email: string, password: string) {
    if (fullName === '' || email === '' || password === '') {
        throw new Error('Please provide all the fields')
    }
    if(!fullName || !email || !password) {
        throw new Error('Please provide all the fields')
    }
    const res = await db.insert(users).values({fullName, email, password})
    // const res = await db.insert(user).values({fullName: "usama", email: "usama@gmail.com",password: 'abc'})
    console.log(res)
    return res
}

async function googleLogin() {
    console.log('clicked')
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        session: false
    })
}

async function googleCallback() {
    console.log('callback')
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure',
        session: false
    })
    // return 'cb'
}

async function googleSuccess(token: string) {
    const data = jwt.verify(token, process.env.SECRET || 'secret')
    
    // console.log({data})
    return 'success usama'
}

async function googleFailure() {
    return 'failure bro'
}

export default {
    login,
    signup,
    googleLogin,
    googleCallback,
    googleSuccess,
    googleFailure
}