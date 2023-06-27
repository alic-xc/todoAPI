const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the JWT from the request headers
  const token = req.header("Authorization").split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "SECRET_KEY");
    console.log("Decoded", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
