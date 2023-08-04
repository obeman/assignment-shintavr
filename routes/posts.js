const express = require("express");
var router = express.Router();
const collectionName = "posts";
const { firestore, auth } = require("../config/firebase.js");
const Middleware = require('../middleware/validation.js');

router.post("/create-post", async (req, res) => {
  const collectionRef = await firestore.collection(collectionName);

  const querySnapshot = await collectionRef.get();

  const collectionSize = querySnapshot.size;

  req.body.id = collectionSize + 1;

  collectionRef
    .add(req.body)
    .then((docRef) => {
      console.log("Document written with ID:", docRef.id);
      res.status(200).json(req.body);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
      res.status(500).json({ error: "Failed" });
    });
});

router.post('/all-posts', Middleware.decodeToken, async (req, res) => {
    try {
        const name = req.body.name;

        const collectionRef = firestore.collection(collectionName);

        const querySnapshot = await collectionRef.orderBy('id', 'desc').get();

        const posts = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            posts.push(doc.data());
        });

        res.status(200).json({posts});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed" });
    }
});

router.post('/update-post', async (req, res) => {
    try {
        const id = req.body.id;

        const collectionRef = firestore.collection(collectionName);
        const querySnapshot = await collectionRef.where("id", "==", id).get();

        if (querySnapshot.empty) {
            // If the document does not exist, send a response indicating it doesn't exist
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log(querySnapshot);

        const documentSnapshot = querySnapshot.docs[0];
        await documentSnapshot.ref.update(req.body);

        res.status(200).json({ message: 'Document successfully updated' });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: "Failed to update document" });
    }
});

router.post('/delete-post', async (req, res) => {
    try {
        const id = req.body.id;

        const collectionRef = firestore.collection(collectionName);
        const querySnapshot = await collectionRef.where("id", "==", id).get();

        if (querySnapshot.empty) {
            // If the document does not exist, send a response indicating it doesn't exist
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log(querySnapshot);

        const documentSnapshot = querySnapshot.docs[0];
        await documentSnapshot.ref.delete();

        res.status(200).json({ message: 'Document successfully deleted' });
    } catch (error) {
        console.error('Error delete document:', error);
        res.status(500).json({ error: "Failed to delete document" });
    }
});



module.exports = router;
