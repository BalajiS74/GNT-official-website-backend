import {
  saveRegister,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../models/index.js";

const emailRegex = /^\S+@\S+\.\S+$/;

export const createRegistration = async (req, res) => {
  try {
    const { name, email, phone, course, program, message } = req.body;

    if (!name || !email || !phone || !course || !program) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Phone must be 10 digits" });
    }

    await saveRegister({ name, email, phone, course, program, message });

    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Register Create Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await getRegistrations();
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error("Registration Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await getRegistrationById(id);

    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    console.error("Registration Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, course, program, message } = req.body;

    if (!name || !email || !phone || !course || !program) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Phone must be 10 digits" });
    }

    const result = await updateRegistration({ id, name, email, phone, course, program, message });

    if (!result || result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({ success: true, message: "Registration updated successfully" });
  } catch (error) {
    console.error("Registration Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRegistration(id);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({ success: true, message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Registration Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
