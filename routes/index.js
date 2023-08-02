const express = require('express');
const app = express();
const port = 5000;
const admin = require('firebase-admin');
const serviceAccount = require(`./assignment-shintavr-cert.json`)
const {doLogin} = require('../auth_google.js');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', async (req, res) => {
    try {
        const loginResult = await doLogin();
        console.log(loginResult);
        res.status(200).send(loginResult);
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})