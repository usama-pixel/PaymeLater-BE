import { Router } from "express";
import clientController from '../controllers/client.controller'

export const router = Router()

router.get("/clients", clientController.getClients)
router.get("/clients/:id", clientController.getClient)
router.post("/clients", clientController.createClient)
router.put("/clients/:id", clientController.updateClient)
router.delete("/clients/:id", clientController.deleteClient)