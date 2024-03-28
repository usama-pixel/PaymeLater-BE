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
const passport_1 = __importDefault(require("passport"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
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
        const res = yield db_1.db.insert(schema_1.user).values({ fullName, email, password });
        // const res = await db.insert(user).values({fullName: "usama", email: "usama@gmail.com",password: 'abc'})
        console.log(res);
        return res;
    });
}
function googleLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        passport_1.default.authenticate('google', {
            scope: ['email', 'profile'],
            session: false
        });
    });
}
function googleCallback() {
    return __awaiter(this, void 0, void 0, function* () {
        passport_1.default.authenticate('google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure',
            session: false
        });
        // return 'cb'
    });
}
function googleSuccess() {
    return __awaiter(this, void 0, void 0, function* () {
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