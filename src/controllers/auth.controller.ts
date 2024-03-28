import { NextFunction, Request, Response } from "express";
import authService from '../services/auth.service'
import passport from "passport";
import passportSetup from '../utils/auth'
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import * as  jwt from 'jsonwebtoken'

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        await authService.login()
        res.send('login')
    } catch(err) {
        next(err)
    }
}

async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await authService.signup(req.body.fullName, req.body.email, req.body.password)
        res.json(data)
    } catch(err) {
        next(err)
    }
}

async function googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
        passportSetup.authenticate('google', {
            scope: ['email', 'profile'],
            session: false
        })(req, res, next);
        // res.json('data')
    } catch(err) {
        next(err)
    }
}

async function googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
        passport.authenticate('google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure',
            session: false
        }, async (err:Error, userData: any, info: any) => {
            const data = await db.select({email: user.email}).from(user).where(eq(user.email, userData?.email))
            if(!data.length) {
                await db.insert(user).values({email: userData.email, fullName: userData.displayName, profileUrl: userData.picture})
            }
            const token = jwt.sign(userData, process.env.SECRET||'secret');
            return res.redirect(`/auth/google/success?token=${token}`)
        })(req, res, next);
        // const data = await authService.googleCallback()
        // res.json(data)
    } catch(err) {
        next(err)
    }
}

async function googleSuccess(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('gogle sucess')
        console.log(req.params)
        console.log(req.query)
        const token = req.query?.token as string
        const data = await authService.googleSuccess(token)
        res.json(data)
    } catch(err) {
        next(err)
    }
}
async function googleFailure(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await authService.googleFailure()
        res.json(data)
    } catch(err) {
        next(err)
    }
}

export default {
    login,
    signup,
    googleLogin,
    googleCallback,
    googleSuccess,
    googleFailure,
}