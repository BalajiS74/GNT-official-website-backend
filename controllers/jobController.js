import {
  saveJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../models/index.js";

export const createJobApplication = async (req, res) => {
  try {
    const { fullName, email, phone, position, coverLetter } = req.body;
    const resumePath = req.file ? req.file.filename : null;

    if (!fullName || !email || !phone || !position) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    await saveJobApplication({ fullName, email, phone, position, resume: resumePath, coverLetter });

    res.status(201).json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Job Application Create Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllJobApplications = async (req, res) => {
  try {
    const applications = await getJobApplications();
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Job Application Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await getJobApplicationById(id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("Job Application Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, position, coverLetter } = req.body;
    const current = await getJobApplicationById(id);

    if (!current) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const resumePath = req.file ? req.file.filename : current.resume;

    if (!fullName || !email || !phone || !position) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const result = await updateJobApplication({
      id,
      fullName,
      email,
      phone,
      position,
      resume: resumePath,
      coverLetter,
    });

    if (!result || result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, message: "Application updated successfully" });
  } catch (error) {
    console.error("Job Application Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteJobApplication(id);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Job Application Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
