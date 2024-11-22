import nodemailer from ('nodemailer');
import { email } from './config';

async function sendNotification(transaction) {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email.user,
        pass: email.pass
    },
});

const mailOptions = {
    from: email.user,
    to: email.recpient,
    subject: 'Transaction Notification',
    text: ' buy transactyion detected:\n${JSON.stringify(transaction, null, 2)}'
};

try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
} catch (error) {
    console.error('Error sending email:', error);
}
}

export { sendNotification };