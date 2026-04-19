import express from "express";
import multer from "multer";
import fs from "fs";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplication,
  editJobApplication,
  removeJobApplication,
} from "../controllers/jobController.js";

const router = express.Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/apply-job", upload.single("resume"), createJobApplication);
router.get("/apply-job", getAllJobApplications);
router.get("/apply-job/:id", getJobApplication);
router.put("/apply-job/:id", upload.single("resume"), editJobApplication);
router.delete("/apply-job/:id", removeJobApplication);

export default router;
