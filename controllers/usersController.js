const { createUser } = require('../models/usersModel');

const createUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await createUser(name, email, password);
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

module.exports = { createUserHandler };
