const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  createdAt: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
