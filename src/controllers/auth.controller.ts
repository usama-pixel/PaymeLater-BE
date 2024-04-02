import { NextFunction, Request, Response } from "express";
import authService from '../services/auth.service'
import passport from "passport";
import passportSetup from '../utils/auth'
import { db } from "../db";
import { users } from "../db/schema";
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
            const data = await db.select({email: users.email}).from(users).where(eq(users.email, userData?.email))
            if(!data.length) {
                await db.insert(users).values({email: userData.email, fullName: userData.displayName, profileUrl: userData.picture})
            }
            const token = jwt.sign(userData, process.env.SECRET||'secret', {expiresIn: '1h'});
            const refreshToken = jwt.sign(userData, process.env.R_SECRET||'Rsecret')
            await db.update(users).set({refreshToken}).where(eq(users.email, userData.email))
            // const d = await db.selectDistinct().from(user).where(eq(user.email, userData.email))
            // console.log({d})
            // res.
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
        const token = req.query?.token as string
        const data = await authService.googleSuccess(token)
        res.json({data, token})
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

async function token(req: Request, res: Response, next: NextFunction) {
    try {
        const refresh_token = req.body?.refresh_token as string
        if(!refresh_token) throw new Error('Refresh token not provided')
        const data = await db.select().from(users).where(eq(users.refreshToken, refresh_token))
        if(!data.length) throw new Error('Invalid refresh token')
        jwt.verify(
            refresh_token,
            process.env.R_SECRET||'Rsecret',
            (err, user) => {
                if(err) res.sendStatus(403)
                const token = generateToken({email: data[0].email as string})
                res.json({token})
            }
        )
        // const token = generateToken({email: data[0].email as string})
        // if(data[0].email)  db.update(user).set({refreshToken: token}).where(eq(user.email, data[0].email))
        // res.json({token})
    } catch(err) {
        next(err)
        // const data = jwt.verify(refresh_token, process.env.R_SECRET||'Rsecret')
    }
}

async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        const refresh_token = req.body?.refresh_token as string
        if(!refresh_token) throw new Error('Token not provided')
        await db.update(users).set({refreshToken: ''}).where(eq(users.refreshToken, refresh_token))
    } catch(err) {
        next(err)
    }
}

function generateToken({email}: {email: string}): string {
    const token = jwt.sign({email}, process.env.SECRET||'secret')
    return token
}
export default {
    login,
    signup,
    googleLogin,
    googleCallback,
    googleSuccess,
    googleFailure,
    token,
    logout
}