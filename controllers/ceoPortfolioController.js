import {
  saveCeoPortfolio,
  getCeoPortfolios,
  getCeoPortfolioById,
  updateCeoPortfolio,
  deleteCeoPortfolio,
} from "../models/index.js";

export const createCeoPortfolio = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject, and message are required",
      });
    }

    await saveCeoPortfolio({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "CEO portfolio saved successfully",
    });
  } catch (error) {
    console.error("CEO Portfolio Create Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllCeoPortfolios = async (req, res) => {
  try {
    const portfolios = await getCeoPortfolios();
    res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    console.error("CEO Portfolio Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCeoPortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await getCeoPortfolioById(id);

    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    console.error("CEO Portfolio Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editCeoPortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject, message } = req.body;

    const result = await updateCeoPortfolio({ id, name, email, subject, message });

    if (!result) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
    });
  } catch (error) {
    console.error("CEO Portfolio Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeCeoPortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCeoPortfolio(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.error("CEO Portfolio Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};