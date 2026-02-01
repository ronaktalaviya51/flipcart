const fs = require("fs");
const path = require("path");

const SETTINGS_FILE = path.join(__dirname, "../data/settings.json");

const ipCheckMiddleware = async (req, res, next) => {
  try {
    let allowedIpsString = "";
    if (fs.existsSync(SETTINGS_FILE)) {
      const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
      allowedIpsString = settings.allowed_ip || "";
    }

    if (!allowedIpsString || allowedIpsString.trim() === "") {
      return next();
    }

    let clientIp =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    if (clientIp.startsWith("::ffff:")) clientIp = clientIp.substr(7);
    if (clientIp === "::1") clientIp = "127.0.0.1";

    const allowedIps = allowedIpsString.split(",").map((ip) => ip.trim());
    if (allowedIps.includes(clientIp)) {
      return next();
    } else {
      console.warn(`Blocked access from unauthorized IP: ${clientIp}`);
      return res.status(403).json({
        success: false,
        message: "Forbidden: Access denied from your IP.",
      });
    }
  } catch (error) {
    console.error("IP Check Error:", error);
    next();
  }
};

module.exports = ipCheckMiddleware;
