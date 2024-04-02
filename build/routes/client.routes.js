"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const client_controller_1 = __importDefault(require("../controllers/client.controller"));
exports.router = (0, express_1.Router)();
exports.router.get("/clients", client_controller_1.default.getClients);
exports.router.get("/clients/:id", client_controller_1.default.getClient);
exports.router.post("/clients", client_controller_1.default.createClient);
exports.router.put("/clients/:id", client_controller_1.default.updateClient);
exports.router.delete("/clients/:id", client_controller_1.default.deleteClient);
//# sourceMappingURL=client.routes.js.map