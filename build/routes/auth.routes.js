"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_1 = require("../middlewares/auth");
exports.router = (0, express_1.Router)();
exports.router.post("/login", auth_controller_1.default.login);
exports.router.post("/signup", auth_controller_1.default.signup);
exports.router.get("/auth/google", auth_controller_1.default.googleLogin);
exports.router.get("/auth/google/callback", auth_controller_1.default.googleCallback);
exports.router.get('/auth/google/success', auth_1.isLoggedin, auth_controller_1.default.googleSuccess);
exports.router.get('/auth/google/failure', auth_controller_1.default.googleFailure);
exports.default = exports.router;
//# sourceMappingURL=auth.routes.js.map