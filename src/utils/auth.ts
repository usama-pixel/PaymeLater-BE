import passport, { DoneCallback, Profile } from 'passport';
import { Strategy as GoogleStrategy, Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth2';
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
dotenv.config()

const g_id = process.env.GOOGLE_CLIENT_ID
const g_secret = process.env.GOOGLE_CLIENT_SECRET
if(!g_id) throw new Error('GOOGLE_CLIENT_ID is null or undefined')
if(!g_secret) throw new Error('GOOGLE_CLIENT_SECRET is null or undefined')

passport.use(new GoogleStrategy({
    clientID:     g_id,
    clientSecret: g_secret,
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
  },
  function(request: any, accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback) {
    console.log('inside auth.js')
    // console.log('profile ->', profile)
    done(null,profile)
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user: any, done) => {
  done(null, user)
})


export async function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("middle ware")
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('Token not provided')
    const data = jwt.verify(token, process.env.SECRET || 'secret')
    req.user = data
    next()
  } catch(err) {
    next(err)
  }
}

export default passport