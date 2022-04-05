const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config()

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const USER_ACCOUNT = process.env.GMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(reqBody) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: USER_ACCOUNT,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        const mailOptions = {
            from: `My Portfolio ${USER_ACCOUNT}`,
            to: process.env.WORK_EMAIL,
            subject: 'My Portfolio Contact Me Page',
            text: `From: ${reqBody.name}, Email: ${reqBody.email}, Contact Number: ${reqBody.contactNo}, Message: ${reqBody.msg}`,
            html: `<h1>From: ${reqBody.name}</h1>
            <h2>Email: ${reqBody.email}</h2>
            <p>Contact Number: ${reqBody.contactNo}</p>
            <p>Message: ${reqBody.msg}</p>
            `
        };

        const result = await transport.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error;
    }
}

sendToMe = (reqBody) => {
    return sendMail(reqBody)
        .then((result) => {
            console.log('Email sent...', result)
            return result
        })
        .catch((error) => console.log(error.message));
}



module.exports = {
    sendToMe
}