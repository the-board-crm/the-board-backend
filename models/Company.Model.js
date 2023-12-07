const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  ContactFirstName: { type: String, required: true },
  ContactLastName: { type: String, required: true },
  CompanyName: { type: String, required: true },
  CompanyEmail: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  CompanyPhone: { type: Number, required: false },
  CompanyAddress: { type: String, required: true },
  CompanyDescription: { type: String, required: false },
});

const Company = model("Company", companySchema);

module.exports = Company;
