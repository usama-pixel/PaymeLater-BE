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
const cron = __importStar(require("node-cron"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const nodemailer = __importStar(require("nodemailer"));
// cron.schedule('* * * * *', () => {
//     // This function will run every minute
//     console.log('This runs every minute');
// });
cron.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('script ran');
    const content = `script ran at ${new Date()}\n`;
    fs_1.default.writeFile('log.txt', content, { flag: 'a' }, err => {
        if (err) {
            console.log('Error while writing to log.txt');
            return;
        }
    });
    const data = yield db_1.db.select().from(schema_1.clients);
    for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].deadline && (0, date_fns_1.isPast)(new Date(data[i].deadline + ''))) {
            sendEmail(data[i].email, 'Default Usama', 'Payment Reminder', `Hi ${data[i].name}, Your deadline for bill is overdue. Your total amount to pay is ${data[i].amount}`);
        }
    }
}));
function sendEmail(toEmail, from, subject, msg) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    const details = {
        from,
        to: toEmail,
        subject,
        text: msg,
    };
    transporter.sendMail(details, (err) => {
        if (err) {
            console.log('Error occured while sending mail', err);
            return;
        }
        console.log('email sent');
        const content = `Email sent at ${new Date()}\n`;
        fs_1.default.writeFile('log.txt', content, { flag: 'a' }, err => {
            if (err) {
                console.log('Error while writing to log.txt');
                return;
            }
        });
    });
}
//# sourceMappingURL=cron-script.js.map