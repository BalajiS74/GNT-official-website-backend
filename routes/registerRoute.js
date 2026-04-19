import express from "express";
import {
  createRegistration,
  getAllRegistrations,
  getRegistration,
  editRegistration,
  removeRegistration,
} from "../controllers/registerController.js";

const router = express.Router();

router.post("/register", createRegistration);
router.get("/register", getAllRegistrations);
router.get("/register/:id", getRegistration);
router.put("/register/:id", editRegistration);
router.delete("/register/:id", removeRegistration);

export default router;
