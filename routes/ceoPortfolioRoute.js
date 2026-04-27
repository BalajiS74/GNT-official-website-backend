import express from "express";
import {
  createCeoPortfolio,
  getAllCeoPortfolios,
  getCeoPortfolio,
  editCeoPortfolio,
  removeCeoPortfolio,
} from "../controllers/ceoPortfolioController.js";

const router = express.Router();

router.post("/ceo-portfolio", createCeoPortfolio);
router.get("/ceo-portfolio", getAllCeoPortfolios);
router.get("/ceo-portfolio/:id", getCeoPortfolio);
router.put("/ceo-portfolio/:id", editCeoPortfolio);
router.delete("/ceo-portfolio/:id", removeCeoPortfolio);

export default router;