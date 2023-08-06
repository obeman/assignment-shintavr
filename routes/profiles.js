const express = require("express");
var router = express.Router();
const Middleware = require("../middleware/validation.js");

router.post("/user", Middleware.decodeToken, async (req, res) => {
    try {
        res.status(200).send({
            email: req.body.user.email,
            username: req.body.user.displayName,
            photoURL: req.body.user.photoURL,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;