import { pgTable, serial, text, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    fullName: text("full_name"),
    email: text("email").unique(),
    password: text("password"),
    profileUrl: text("profile_url"),
    token: text("token"),
    refreshToken: text("refresh_token")
    // phone: varchar("phone", {length: 256}),
    // address: text("address")
})

export const clients = pgTable('clients', {
    id: serial('id').primaryKey().notNull(),
    name: text('name'),
    email: text('email').notNull(),
    phone: text('phone'),
    amount: text('amount'),
    deadline: date('deadline'),
})