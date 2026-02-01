const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Bypass check for our hardcoded token
      if (token === "hardcoded-token") {
        req.user = {
          id: 1,
          username: "flipcart",
          name: "Admin",
          role: "admin",
        };
        return next();
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret",
      );
      req.user = { id: decoded.id, username: decoded.username };
      next();
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ success: 0, message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ success: 0, message: "Not authorized, no token" });
  }
};

module.exports = { protect };
