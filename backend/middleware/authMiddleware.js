import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check token exists
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // Remove Bearer from token
    token = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user data in request
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Token failed",
    });
  }
};