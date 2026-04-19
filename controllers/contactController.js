import {
  saveContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../models/index.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    await saveContact({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("Contact Create Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Contact Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Contact Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const result = await updateContact({ id, name, email, message });

    if (!result || result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Contact updated successfully" });
  } catch (error) {
    console.error("Contact Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteContact(id);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Contact Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
