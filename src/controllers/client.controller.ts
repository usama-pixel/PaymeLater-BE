import { NextFunction, Request, Response } from "express"
import clientService from '../services/client.service'
async function getClients(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await clientService.getClients()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

async function getClient(req: Request, res: Response, next: NextFunction) {
    try {
        
    } catch (err) {
        next(err)
    }
}

async function createClient(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const d = await clientService.createClient(data)
        res.json(d)
    } catch (err) {
        next(err)
    }
}

async function updateClient(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const { id } = req.params
        if(!id) throw new Error('id is empty')
        const d = await clientService.updateClient(+id, data)
        res.json(d)
    } catch (err) {
        next(err)
    }
}

async function deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
        
    } catch (err) {
        next(err)
    }
}

export default {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
}