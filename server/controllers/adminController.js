const fs = require("fs");
const path = require("path");

const SETTINGS_FILE = path.join(__dirname, "../data/settings.json");

const readJSON = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return null;
  }
};

const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    return false;
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = readJSON(SETTINGS_FILE);
    if (settings) {
      res.json({ success: true, data: settings });
    } else {
      res.json({ success: false, message: "Settings not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = readJSON(SETTINGS_FILE) || {};
    const updated = { ...settings, ...req.body };
    writeJSON(SETTINGS_FILE, updated);
    res.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
