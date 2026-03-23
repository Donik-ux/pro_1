const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, deleteUser } = require("../controllers/userController");

// Use only / as prefix because we'll add /api/users in main index.js
router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").delete(deleteUser);

module.exports = router;
