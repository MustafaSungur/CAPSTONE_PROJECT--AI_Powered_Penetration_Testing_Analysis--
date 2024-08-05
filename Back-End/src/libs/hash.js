import bcrypt from "bcrypt";

async function hashPassword(data) {
  const result = await bcrypt.hash(data, 10);
  if (result) {
    return result;
  }
  throw new Error("Passwords could not hashed");
}
async function comparePassword(data, hash) {
  const result = await bcrypt.compare(data, hash);
  return result;
}

export { hashPassword, comparePassword };
