import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (error) {
    throw new UnAuthenticatedError("authentication invalid");
  }
  next();
};

export default auth;
