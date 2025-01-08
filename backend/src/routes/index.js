const { Router } = require("express");

const { db } = require("../firebase");

const router = Router();

router.get("/contacts", async (req, res) => {
  const querySnapshot = await db.collection("contacts").get();

  const contacts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json({ contacts });

  //res.send(contacts);
});

router.post("/new-contact", async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  await db.collection("contacts").add({
    firstName,
    lastName,
    email,
    phone,
  });

  res.status(200).json({ message: "new contact created!" });
});

router.get("/edit-contact/:id", async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  const doc = await db.collection("contacts").doc(req.params.id).get();

  console.log({ id: doc.id, ...doc.data() });

  res.status(200).json({ message: "Contact updated!" });
});

router.delete("/delete-contact/:id", async (req, res) => {
  const doc = await db.collection("contacts").doc(req.params.id).delete();

  res.status(200).json({ message: "Contact deleted!" });
});

router.post("/update-contact/:id", async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  await db.collection("contacts").update({
    firstName,
    lastName,
    email,
    phone,
  });

  res.status(200).json({ message: "Contact updated!" });
});

module.exports = router;
