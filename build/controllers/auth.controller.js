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
const auth_service_1 = __importDefault(require("../services/auth.service"));
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield auth_service_1.default.login();
            res.send('login');
        }
        catch (err) {
            next(err);
        }
    });
}
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield auth_service_1.default.signup(req.body.fullName, req.body.email, req.body.password);
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
function googleLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield auth_service_1.default.googleLogin();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
function googleCallback(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield auth_service_1.default.googleCallback();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
function googleSuccess(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('user ->', req.user);
            const data = yield auth_service_1.default.googleSuccess();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
function googleFailure(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield auth_service_1.default.googleFailure();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = {
    login,
    signup,
    googleLogin,
    googleCallback,
    googleSuccess,
    googleFailure
};
//# sourceMappingURL=auth.controller.js.map