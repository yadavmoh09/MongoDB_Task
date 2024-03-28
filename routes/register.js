const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

// Apply middleware to set updateDate before saving documents
// router.use(registerController.setUpdateDate);

// Route to create documents
router.post("/", registerController.createDocuments);

module.exports = router;
