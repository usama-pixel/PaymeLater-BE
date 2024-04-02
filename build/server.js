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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const auth_routes_1 = require("./routes/auth.routes");
const client_routes_1 = require("./routes/client.routes");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const date_fns_1 = require("date-fns");
dotenv.config();
if ((0, date_fns_1.isPast)(new Date(2025, 1))) {
    console.log('date is past');
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((err, req, res, next) => {
    console.log({ err });
    res.json("some error occured");
});
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use(auth_routes_1.router);
// app.use(validateUser)
app.use(client_routes_1.router);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=server.js.map