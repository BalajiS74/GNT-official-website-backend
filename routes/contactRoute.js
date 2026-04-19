import express from "express";
import {
  createContact,
  getAllContacts,
  getContact,
  editContact,
  removeContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", getAllContacts);
router.get("/contact/:id", getContact);
router.put("/contact/:id", editContact);
router.delete("/contact/:id", removeContact);

export default router;
