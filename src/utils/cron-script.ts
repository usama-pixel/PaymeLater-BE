import * as cron from 'node-cron';
import { db } from '../db';
import { clients } from '../db/schema';
import { isPast } from 'date-fns';
import fs from 'fs'
import * as nodemailer from 'nodemailer'

// cron.schedule('* * * * *', () => {
//     // This function will run every minute
//     console.log('This runs every minute');
// });

cron.schedule('0 0 * * *', async () => {
    console.log('script ran')
    const content = `script ran at ${new Date()}\n`
    fs.writeFile('log.txt', content, {flag: 'a'}, err => {
        if(err) {
            console.log('Error while writing to log.txt')
            return;
        }
    })
    const data = await db.select().from(clients)
    for(let i = 0; i < data.length; i++) {
        if(data[i] && data[i].deadline && isPast(new Date(data[i].deadline+''))) {
            sendEmail(
                data[i].email,
                'Default Usama',
                'Payment Reminder',
                `Hi ${data[i].name}, Your deadline for bill is overdue. Your total amount to pay is ${data[i].amount}`
            )
        }
    }
})

function sendEmail(toEmail: string, from: string, subject: string, msg: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
    const details = {
        from,
        to: toEmail,
        subject,
        text: msg,
    }
    transporter.sendMail(details, (err) => {
        if(err) {
            console.log('Error occured while sending mail',err)
            return
        }
        console.log('email sent')
        const content = `Email sent at ${new Date()}\n`
        fs.writeFile('log.txt', content, {flag: 'a'}, err => {
            if(err) {
                console.log('Error while writing to log.txt')
                return;
            }
        })
    })
}