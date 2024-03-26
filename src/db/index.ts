import { drizzle } from 'drizzle-orm/node-postgres'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import { Client } from 'pg'
import * as schema from './schema';
dotenv.config()

const db_url = process.env.PG_URL

if (!db_url) {
    throw new Error('Database url is null')
}

const client = new Client({
    connectionString: db_url
})

client.connect()

export const db = drizzle(client, {schema})