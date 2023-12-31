const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require(`./config/assignment-shintavr-cert.json`)


var postsRouter = require("./routes/posts");
var profilesRouter = require("./routes/profiles");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());
app.use(cors());


app.use("/posts", postsRouter);
app.use("/profiles", profilesRouter);


module.exports = app;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });