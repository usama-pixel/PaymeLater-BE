"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("../utils/auth"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const jwt = __importStar(require("jsonwebtoken"));
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
            auth_1.default.authenticate('google', {
                scope: ['email', 'profile'],
                session: false
            })(req, res, next);
            // res.json('data')
        }
        catch (err) {
            next(err);
        }
    });
}
function googleCallback(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            passport_1.default.authenticate('google', {
                successRedirect: '/auth/google/success',
                failureRedirect: '/auth/google/failure',
                session: false
            }, (err, userData, info) => __awaiter(this, void 0, void 0, function* () {
                const data = yield db_1.db.select({ email: schema_1.users.email }).from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, userData === null || userData === void 0 ? void 0 : userData.email));
                if (!data.length) {
                    yield db_1.db.insert(schema_1.users).values({ email: userData.email, fullName: userData.displayName, profileUrl: userData.picture });
                }
                const token = jwt.sign(userData, process.env.SECRET || 'secret', { expiresIn: '1h' });
                const refreshToken = jwt.sign(userData, process.env.R_SECRET || 'Rsecret');
                yield db_1.db.update(schema_1.users).set({ refreshToken }).where((0, drizzle_orm_1.eq)(schema_1.users.email, userData.email));
                // const d = await db.selectDistinct().from(user).where(eq(user.email, userData.email))
                // console.log({d})
                // res.
                return res.redirect(`/auth/google/success?token=${token}`);
            }))(req, res, next);
            // const data = await authService.googleCallback()
            // res.json(data)
        }
        catch (err) {
            next(err);
        }
    });
}
function googleSuccess(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.query) === null || _a === void 0 ? void 0 : _a.token;
            const data = yield auth_service_1.default.googleSuccess(token);
            res.json({ data, token });
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
function token(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const refresh_token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.refresh_token;
            if (!refresh_token)
                throw new Error('Refresh token not provided');
            const data = yield db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.refreshToken, refresh_token));
            if (!data.length)
                throw new Error('Invalid refresh token');
            jwt.verify(refresh_token, process.env.R_SECRET || 'Rsecret', (err, user) => {
                if (err)
                    res.sendStatus(403);
                const token = generateToken({ email: data[0].email });
                res.json({ token });
            });
            // const token = generateToken({email: data[0].email as string})
            // if(data[0].email)  db.update(user).set({refreshToken: token}).where(eq(user.email, data[0].email))
            // res.json({token})
        }
        catch (err) {
            next(err);
            // const data = jwt.verify(refresh_token, process.env.R_SECRET||'Rsecret')
        }
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const refresh_token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.refresh_token;
            if (!refresh_token)
                throw new Error('Token not provided');
            yield db_1.db.update(schema_1.users).set({ refreshToken: '' }).where((0, drizzle_orm_1.eq)(schema_1.users.refreshToken, refresh_token));
        }
        catch (err) {
            next(err);
        }
    });
}
function generateToken({ email }) {
    const token = jwt.sign({ email }, process.env.SECRET || 'secret');
    return token;
}
exports.default = {
    login,
    signup,
    googleLogin,
    googleCallback,
    googleSuccess,
    googleFailure,
    token,
    logout
};
//# sourceMappingURL=auth.controller.js.map