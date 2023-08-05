const express = require("express");
var router = express.Router();
const collectionName = "posts";
const { firestore, auth, app } = require("../config/firebase.js");
const Middleware = require("../middleware/validation.js");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");

router.post("/create-post", Middleware.decodeToken, async (req, res) => {
  const collectionRef = await firestore.collection(collectionName);

  const querySnapshot = await collectionRef.get();

  const collectionSize = querySnapshot.size;
  const timestampNow = Timestamp.now();

  req.body.id = collectionSize + 1;

  console.log("zap time: ", timestampNow);

  collectionRef
    .add({
      id: req.body.id,
      name: req.body.name,
      body: req.body.body,
      timestamp: timestampNow.toDate(),
    })
    .then((docRef) => {
      //   console.log("Document written with ID:", docRef.id);
      res.status(200).json(req.body);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
      res.status(500).json({ error: "Failed" });
    });
});

router.post("/all-posts", Middleware.decodeToken, async (req, res) => {
  try {

    const collectionRef = firestore.collection(collectionName);

    const querySnapshot = await collectionRef.orderBy("timestamp", "desc").get();

    const posts = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      posts.push({
        ...doc.data(),
        docId: doc.id,
      });
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/update-post", Middleware.decodeToken, async (req, res) => {
    const id = req.body.docId;

    const collectionRef = firestore.collection(collectionName)
    const documentRef = collectionRef.doc(id);
    const documentData = (await documentRef.get()).data();

    if(documentData.name != req.body.username) {
        res.status(401).json({error: 'Update Function error: Unauthorized Access'})
    }else{
        await documentRef.update({
            body : req.body.body,
        }).then((updated) => {
            res.status(200).json({ message: "Document successfully updated" });
        }).catch((err) => {
            console.error("Error updating document:", err);
            res.status(500).json({ err: "Failed to update document" });
        });
    }
});

router.post("/delete-post", Middleware.decodeToken, async (req, res) => {
  try {
    const id = req.body.id;
    console.log("idzap : ",id);

    const collectionRef = firestore.collection(collectionName);
    const documentRef = collectionRef.doc(id);

    const documentData = (await documentRef.get()).data();
    console.log("document data obe : ", documentData.name);
    console.log("username : ", req.body.username)

    if(documentData.name != req.body.username) {
        res.status(401).json({error: 'Delete Function error: Unauthorized Access'})
    }else{
        await collectionRef.doc(id).delete();
        res.status(200).json({ message: "Document successfully deleted" });
    }    
  } catch (error) {
    console.error("Error delete document:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
});


module.exports = router;
