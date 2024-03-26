import { NextFunction, Request, Response } from "express";
import authService from '../services/auth.service'

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

export default {
    login,
    signup
}