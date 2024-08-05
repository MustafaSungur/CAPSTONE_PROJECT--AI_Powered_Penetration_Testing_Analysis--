import { comparePassword, hashPassword } from "../libs/hash.js";
import User from "../models/User.js";

export async function loginRepo(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
}

export async function registerRepo(firstname, lastname, email, password) {
  try {
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export async function deleteUserRepo(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

export async function updateUserRepo(id, user) {
  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Compare the new plain text password with the existing hashed password
    const isMatch = await comparePassword(user.password, existingUser.password);

    if (!isMatch || user.password) {
      // Hash the new plain text password
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    }

    // Merge the existing user data with the new data
    const updatedUser = { ...existingUser.toObject(), ...user };

    const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    if (!result) {
      throw new Error("Failed to update user");
    }

    return result;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function saveUserUrlId(url) {
  try {
    const userId = url.user;
    const urlId = url._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(`User not found`);
    }

    user.urls.push(urlId);
    await user.save();

    return "Success";
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
