import {
  saveMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} from "../models/index.js";

const formatMeetingDate = (date) =>
  new Date(date).toISOString().slice(0, 19).replace("T", " ");

export const createMeeting = async (req, res) => {
  try {
    const { name, email, phone, date } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const formattedDate = formatMeetingDate(date);
    await saveMeeting({ name, email, phone, date: formattedDate });

    res.status(201).json({ success: true, message: "Meeting booked successfully" });
  } catch (error) {
    console.error("Meeting Create Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await getMeetings();
    res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    console.error("Meeting Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await getMeetingById(id);

    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    console.error("Meeting Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, date } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const formattedDate = formatMeetingDate(date);
    const result = await updateMeeting({ id, name, email, phone, date: formattedDate });

    if (!result || result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({ success: true, message: "Meeting updated successfully" });
  } catch (error) {
    console.error("Meeting Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMeeting(id);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({ success: true, message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Meeting Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
