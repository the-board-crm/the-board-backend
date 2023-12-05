const router = require("express").Router();
const mongoose = require("mongoose");

const Task = require("../models/Task.Model");

router.post("/tasks", (req, res, next) => {
  const { title, description, dueDate, completed, contact, createdAt } =
    req.body;

  Task.create({ title, description, dueDate, completed, contact, createdAt })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "task couldn't be created" });
    });
});

router.get("/tasks", (req, res, next) => {
  Task.find()
    .populate("companies")
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "could not display tasks" });
    });
});

router.get("/tasks/:id", (req, res, next) => {
  const { id } = req.params;

  Task.findById(id)
    .populate("companies")
    .then((task) => res.status(200).json(task))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error displaying task details" });
    });
});

router.put("/tasks/:id", (req, res, next) => {
  const { id } = req.params;

  Task.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error updating task" });
    });
});

router.delete("/tasks/:id", (req, res, next) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id)
    .then(() =>
      res.json({
        message: `the task is gone`
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "task could not be deleted" });
    });
});

module.exports = router;
