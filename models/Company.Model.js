const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema(
  {
    ContactFirstName: { String, required: true },
    ContactLastName: { String, required: true },
    CompanyName: { String, required: true },
    CompanyEmail: {
      String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    CompanyPhone: { Number, required: false },
    CompanyAdress: { String, required: true },
    CompanyDescription: { String, required: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);
const Company = model("Company", companySchema);

module.exports = Company;
