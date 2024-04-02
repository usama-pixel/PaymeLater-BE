"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
function getClients() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield db_1.db.select().from(schema_1.clients);
        return data;
    });
}
function getClient() {
    return __awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
function createClient(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.db.insert(schema_1.clients).values(data).returning();
        return res;
    });
}
function updateClient(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.db.update(schema_1.clients)
            .set(Object.assign({}, data))
            .where((0, drizzle_orm_1.eq)(schema_1.clients.id, id))
            .returning();
        return res;
    });
}
function deleteClient() {
    return __awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
exports.default = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};
//# sourceMappingURL=client.service.js.map