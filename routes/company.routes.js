const router = require("express").Router();
const mongoose = require("mongoose");

const Company = require("../models/Company.Model");
const { response } = require("express");

// Create new company
router.post("/companies", (req, res, next) => {
  const {
    ContactFirstName,
    ContactLastName,
    CompanyName,
    CompanyEmail,
    CompanyPhone,
    CompanyAddress,
    CompanyDescription,
  } = req.body;

  Company.create({
    ContactFirstName,
    ContactLastName,
    CompanyName,
    CompanyEmail,
    CompanyPhone,
    CompanyAddress,
    CompanyDescription
  })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("Error while creating company...", err);
      res.status(500).json({ message: "Error while creating company" });
    });
});

// Retrive all companies
router.get("/companies", (req, res, next) => {
  Company.find()
    .populate("tasks")
    .then((companiesArr) => {
      res.json(companiesArr);
    })
    .catch((err) => {
      console.log("Error while getting the companies...", err);
      res.status(500).json({ message: "Error while getting companies..." });
    });
});

// Retrieve a spesific company by ID
router.get("/companies/:companyId", (req, res, next) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }
  Company.findById(companyId)
    .populate("tasks")
    .then((company) => res.status(200).json(company))
    .catch((err) => {
      console.log("Error while getting company details...", err);
      res.status(500).json({ message: "Error getting company details..." });
    });
});

// Update specific company by ID
router.put("/companies/:companyId", (req, res, next) => {
  const { companyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }
  Company.findByIdAndUpdate(companyId, req.body, { new: true })
    .then((updatedCompany) => res.json(updatedCompany))
    .catch((err) => {
      console.log("Error while updating company...", err);
      res.status(500).json({ message: "Error while updating company..." });
    });
});

// Delete a spesific company by ID
router.delete("/companies/:companyId", (req, res, next) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }
  Company.findByIdAndDelete(companyId)
    .then(() =>
      res.json({ message: `Company with ${companyId} is removed successfully` })
    )
    .catch((err) => {
      console.log("Error while deleting the company...", err);
      res.status(500).json({ message: "Error while deleting the company..." });
    });
});

module.exports = router;
