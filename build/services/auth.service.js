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
const passport_1 = __importDefault(require("passport"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const jwt = __importStar(require("jsonwebtoken"));
function login() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function signup(fullName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fullName === '' || email === '' || password === '') {
            throw new Error('Please provide all the fields');
        }
        if (!fullName || !email || !password) {
            throw new Error('Please provide all the fields');
        }
        const res = yield db_1.db.insert(schema_1.users).values({ fullName, email, password });
        // const res = await db.insert(user).values({fullName: "usama", email: "usama@gmail.com",password: 'abc'})
        console.log(res);
        return res;
    });
}
function googleLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('clicked');
        passport_1.default.authenticate('google', {
            scope: ['email', 'profile'],
            session: false
        });
    });
}
function googleCallback() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('callback');
        passport_1.default.authenticate('google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure',
            session: false
        });
        // return 'cb'
    });
}
function googleSuccess(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jwt.verify(token, process.env.SECRET || 'secret');
        // console.log({data})
        return 'success usama';
    });
}
function googleFailure() {
    return __awaiter(this, void 0, void 0, function* () {
        return 'failure bro';
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
//# sourceMappingURL=auth.service.js.map