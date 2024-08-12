const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

//Configure email transport using nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    },
});

app.post('/send-prayer-request', (req, res) => {
    const { message } = req.body;

    const mailOptions = {
        from: 'no-reply@wesley.com',
        to: 'alectmc@gmail.com',
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
    console.log(`Server running on port ${port}`);
});