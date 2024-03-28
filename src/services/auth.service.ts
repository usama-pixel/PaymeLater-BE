import passport from "passport"
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