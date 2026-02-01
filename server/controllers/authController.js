const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: 0, message: "Email and Password are required." });
  }

  // Hardcoded check
  if (email === "flipcart" && password === "flipcart123") {
    return res.json({
      success: 1,
      message: "User logged in successfully.",
      data: { id: 1, username: "flipcart", name: "Admin", role: "admin" },
    });
  }

  res.status(401).json({ success: 0, message: "Invalid credentials." });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  // Since we removed OTP from client, this is just for safety/legacy
  const token = jwt.sign(
    { id: 1, username: "flipcart", role_id: 1 },
    process.env.JWT_SECRET || "fallback_secret",
    { expiresIn: "30d" },
  );

  res.json({
    success: 1,
    message: "OTP Verified",
    token: token,
    data: { id: 1, username: "flipcart", name: "Admin", role: "admin" },
  });
};

const getMe = async (req, res) => {
  // If we have a token, we just returning dummy user
  res.json({
    success: true,
    data: { id: 1, username: "flipcart", name: "Admin", role: "admin" },
  });
};

module.exports = {
  login,
  verifyOtp,
  getMe,
};
