const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signIn'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MySQL Database.");
});

//Sign-in endpoint
app.post('/signin', (req, res) => {
    const { firstName, lastName, email } =req.body;
    const query = `
        INSERT INTO Users (firstName, lastName, email, lastSignIn) 
        VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
            firstName = VALUES(firstName),
            lastName = VALUES(lastName),
            lastSignIn = NOW();
    `;
    db.query(query, [firstName, lastName, email], (err, result) => {
        if (err) {
            res.status(500).send('Error recording sign in...');
            return;
        }
        res.status(200).send('Sign In Successful');
    });
});

//Get all sign ins endpoint
app.get('/signins', (req, res) => {
    db.query('SELECT * FROM Users', (err, result) => {
        if (err) {
            res.status(500).send('Error fetching sign in data...');
            return;
        }
        res.status(200).json(results);
    });
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});