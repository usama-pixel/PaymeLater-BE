import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),
    email: text("email").unique(),
    password: text("password")
    // phone: varchar("phone", {length: 256}),
    // address: text("address")
})