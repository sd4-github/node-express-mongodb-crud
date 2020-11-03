const express = require("express");
const router = express.Router();
const tutorials = require("../controllers/tutorial.controller.js");

// Create a new Tutorial
router.post("/create", tutorials.create);

// Retrieve all Tutorials
router.get("/list", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:_id", tutorials.findOne);

// Update a Tutorial with id
router.put("/update/:_id", tutorials.update);

// Delete a Tutorial with id
router.delete("/delete/:_id", tutorials.delete);

// Create a new Tutorial
router.delete("/deleteall", tutorials.deleteAll);

module.exports = router;

   