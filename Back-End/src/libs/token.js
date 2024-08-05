import jwt from "jsonwebtoken";

async function generateToken(data) {
  const token = await jwt.sign({ data }, "secretKey", {
    expiresIn: "1h",
  });
  return Promise.resolve(token);
}
async function verifyToken(token) {
  try {
    const result = await jwt.verify(token, "secretKey");
    return result;
  } catch (error) {
    throw new Error("Error:", error);
  }
}

export { verifyToken, generateToken };
