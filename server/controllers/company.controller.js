import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { company_name, company_type, about, market_cap, current_price, high, low, stock_pe, book_value, dividend_yield, roce, roe, face_value } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Company report is required" });
    }

    const company = new Company({
      company_name,
      company_type,
      about,
      market_cap,
      current_price,
      high,
      low,
      stock_pe,
      book_value,
      dividend_yield,
      roce,
      roe,
      face_value,
      company_report: req.file.buffer, 
    });

    await company.save();
    res.status(201).json({ message: "Company created successfully", company });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.deleteOne();
    res.status(200).json({ message: "Company deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
