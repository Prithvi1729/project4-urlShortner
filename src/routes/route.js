const express = require('express');
const router = express.Router();
const Controller = require("../Controllers/CollegeController");
const InternController = require("../Controllers/InternController");




router.post("/functionup/colleges", Controller.createCollege)
router.post("/functionup/interns", InternController.InternCreate)
router.get("/functionup/collegeDetails", Controller.collegeDetails)

module.exports = router;