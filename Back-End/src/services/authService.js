import { generateToken } from "../libs/token.js";
import { comparePassword, hashPassword } from "../libs/hash.js";
import {
  deleteUserRepo,
  loginRepo,
  registerRepo,
  updateUserRepo,
} from "../repository/userRepository.js";

export async function login(email, password) {
  const user = await loginRepo(email);
  if (user) {
    const isMatch = await comparePassword(password, user.password ?? "");

    if (isMatch) {
      const token = await generateToken(user);

      return token;
    } else {
      throw new Error("Email or password incorrect");
    }
  } else {
    throw new Error("User does not exists");
  }
}

export async function register(firstname, lastname, email, password) {
  const hashedPassword = await hashPassword(password);

  const result = await registerRepo(firstname, lastname, email, hashedPassword);
  if (result) {
    return "User Created";
  } else {
    throw new Error("User could not  or user exists");
  }
}

export async function deleteUser(id) {
  const result = await deleteUserRepo(id);
  if (result) {
    return "User deleted successfully";
  } else {
    throw new Error("User delete failed");
  }
}

export async function updateUser(id, user) {
  const result = await updateUserRepo(id, user);
  if (result) {
    return "User updated successfully";
  } else {
    throw new Error("User update failed");
  }
}
