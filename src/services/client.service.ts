import { eq } from "drizzle-orm"
import { db } from "../db"
import { clients } from "../db/schema"

async function getClients() {
    const data = await db.select().from(clients)
    return data
}
async function getClient() {
    return {}
}
async function createClient(data: {name: string, email: string, phone: string, amount: string}) {
    const res = await db.insert(clients).values(data).returning()
    return res
}
async function updateClient(id: number, data: {
    name?: string,
    email?: string,
    phone?: string,
    amount?: string,
    deadline?: string
}) {
    const res = await db.update(clients)
    .set({...data})
    .where(eq(clients.id, id))
    .returning()
    return res
}
async function deleteClient() {
    return {}
}
export default {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
}