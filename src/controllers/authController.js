const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fixed admin credentials
const ADMIN_EMAIL = "codecafelabdev@gmail.com";
const ADMIN_PASSWORD = "CodeCafeLab@1431";
const ADMIN_NAME = "Admin";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if credentials match the fixed admin credentials (case-insensitive email check)
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: 1, email: ADMIN_EMAIL },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: { id: 1, email: ADMIN_EMAIL, name: ADMIN_NAME },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // Return fixed admin profile
    res.json({
      user: { id: 1, email: ADMIN_EMAIL, name: ADMIN_NAME }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
