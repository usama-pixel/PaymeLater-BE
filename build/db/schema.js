"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.user = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    fullName: (0, pg_core_1.text)("full_name"),
    email: (0, pg_core_1.text)("email").unique(),
    password: (0, pg_core_1.text)("password")
    // phone: varchar("phone", {length: 256}),
    // address: text("address")
});
//# sourceMappingURL=schema.js.map