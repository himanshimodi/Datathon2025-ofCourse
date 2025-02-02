import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_type: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  market_cap: {
    type: Number,
    required: true,
  },
  current_price: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  low: {
    type: Number,
    required: true,
  },
  stock_pe: {
    type: Number,
    required: true,
  },
  book_value: {
    type: Number,
    required: true,
  },
  dividend_yield: {
    type: Number,
    required: true,
  },
  roce: {
    type: Number,
    required: true,
  },
  roe: {
    type: Number,
    required: true,
  },
  face_value: {
    type: Number,
    required: true,
  },
  company_report: {
    type: Buffer,
    required: true,
  },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;

