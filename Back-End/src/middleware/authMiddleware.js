import { verifyToken } from "../libs/token.js";

const tokenControll = async (req, res, next) => {
  // Token kontrolü burada yapılır
  const rawToken = req.headers.authorization;
  if (!rawToken) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const token = rawToken.split(" ")[1];
  try {
    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default tokenControll;
