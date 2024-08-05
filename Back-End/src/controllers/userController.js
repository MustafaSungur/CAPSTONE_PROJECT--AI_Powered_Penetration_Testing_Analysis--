import {
  deleteUser,
  login,
  register,
  updateUser,
} from "../services/authService.js";

export async function onLogin(req, res) {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);

    if (token) {
      res.cookie("access_token", token, { httpOnly: true });
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function onRegister(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const result = await register(firstname, lastname, email, password);

    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(400).json({ message: "Register failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function onDelete(req, res) {
  try {
    const { id } = req.body;
    const result = await deleteUser(id);

    if (result) {
      res.status(201).json({ message: "Delete success" });
    }
    res.status(400).json({ message: "Delete failed" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function onUpdateUser(req, res) {
  const { id, firstname, lastname, email, password } = req.body;
  try {
    const result = await updateUser(id, {
      firstname,
      lastname,
      email,
      password,
    });

    if (result) {
      res.status(200).json({ message: "Update success" });
    } else {
      res.status(400).json({ message: "Update failed" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
