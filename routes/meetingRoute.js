import express from "express";
import {
  createMeeting,
  getAllMeetings,
  getMeeting,
  editMeeting,
  removeMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

router.post("/meetings", createMeeting);
router.get("/meetings", getAllMeetings);
router.get("/meetings/:id", getMeeting);
router.put("/meetings/:id", editMeeting);
router.delete("/meetings/:id", removeMeeting);

export default router;
