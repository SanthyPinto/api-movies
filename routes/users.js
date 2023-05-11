const express = require("express");
const router = express.Router();
const { createUserHandler } = require("../controllers/usersController");

// Ruta para crear un usuario
router.post("/", createUserHandler);

module.exports = router;
