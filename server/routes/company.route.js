import express from "express";
import multer from "multer";
import { createCompany, getCompanies, deleteCompany } from "../controllers/company.controller.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("company_report"), createCompany);
router.get("/", getCompanies);
router.delete("/:id", deleteCompany);

export default router;
