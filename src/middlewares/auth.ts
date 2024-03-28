import { NextFunction, Request, Response } from "express";

export async function isLoggedin(req: Request, res: Response, next: NextFunction) {
    next()
}