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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_service_1 = __importDefault(require("../services/client.service"));
function getClients(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client_service_1.default.getClients();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
function getClient(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            next(err);
        }
    });
}
function createClient(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const d = yield client_service_1.default.createClient(data);
            res.json(d);
        }
        catch (err) {
            next(err);
        }
    });
}
function updateClient(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { id } = req.params;
            if (!id)
                throw new Error('id is empty');
            const d = yield client_service_1.default.updateClient(+id, data);
            res.json(d);
        }
        catch (err) {
            next(err);
        }
    });
}
function deleteClient(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};
//# sourceMappingURL=client.controller.js.map