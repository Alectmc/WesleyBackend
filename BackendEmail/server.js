const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//Configure email transport using nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/send-prayer-request', (req, res) => {
    const { message } = req.body;

    const mailOptions = {
        from: 'The Wesley App',
        to: 'wesleyprayerrequests@gmail.com',
        subject: 'WESLEY APP: Prayer Request',
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email...');
        }
        else {
            console.log('Email sent!');
            res.status(200).send('Email sent successfully...');
        }
    });
});

app.listen(port, () => {
    console.log(`Email Server running on port ${port}`);
});