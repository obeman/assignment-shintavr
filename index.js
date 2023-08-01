const express = require('express');
const app = express();
const port = 5000;
const admin = require('firebase-admin');
const serviceAccount = require(`./assignment-shintavr-cert.json`)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})