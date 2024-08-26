const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const serverVersion = 'v0.1b';

app.use(bodyParser.json());

app.post('/check-version', (req, res) => {
    const clientVersion = req.body.version;

    if (clientVersion === serverVersion) {
        res.send({ latest: true });
    } else {
        res.send({ latest: false, latestVersion: serverVersion });
    }
});

app.listen(PORT, () => {
    console.log(`Server running of port ${PORT}`);
});