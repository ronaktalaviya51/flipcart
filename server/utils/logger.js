const logAction = async (req, action, operation) => {
  try {
    const userId = req.user ? req.user.id : 0;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    console.log(
      `[LOG] User: ${userId}, Action: ${action}, Op: ${operation}, IP: ${ip}`,
    );
  } catch (e) {
    console.error("Logging failed", e);
  }
};

module.exports = logAction;
