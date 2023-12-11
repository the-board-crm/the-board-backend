const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  contactFirstName: { type: String, required: true },
  contactLastName: { type: String, required: true },
  companyName: { type: String, required: true },
  companyEmail: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  companyPhone: { type: Number, required: false },
  companyAddress: { type: String, required: true },
  companyDescription: { type: String, required: false },
});

const Company = model("Company", companySchema);

module.exports = Company;
