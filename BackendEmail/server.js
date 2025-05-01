require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const server = express();
const port = process.env.PORT;

server.use(bodyParser.json());

//Configure email transport using nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

server.post('/send-prayer-request', (req, res) => {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
	console.log('Empty message received... Email Not Sending...');
	return res.status(400).send('Message body is empty. Email not sent.');
    }

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

server.listen(port, () => {
    console.log(`Email Server running on port ${port}`);
});
