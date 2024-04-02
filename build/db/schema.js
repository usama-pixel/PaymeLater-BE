"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    fullName: (0, pg_core_1.text)("full_name"),
    email: (0, pg_core_1.text)("email").unique(),
    password: (0, pg_core_1.text)("password"),
    profileUrl: (0, pg_core_1.text)("profile_url"),
    token: (0, pg_core_1.text)("token"),
    refreshToken: (0, pg_core_1.text)("refresh_token")
    // phone: varchar("phone", {length: 256}),
    // address: text("address")
});
exports.clients = (0, pg_core_1.pgTable)('clients', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    name: (0, pg_core_1.text)('name'),
    email: (0, pg_core_1.text)('email').notNull(),
    phone: (0, pg_core_1.text)('phone'),
    amount: (0, pg_core_1.text)('amount'),
    deadline: (0, pg_core_1.date)('deadline')
});
//# sourceMappingURL=schema.js.map