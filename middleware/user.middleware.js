import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// 🔐 Middleware to protect routes by verifying JWT
export const protectRouter = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRouter:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};


export const isUserAllowed = (allowedRoles) => async (req, res, next) => {
  try {
    const user = req.user
    if (allowedRoles.includes(user.role)) {
      return next();
    } else {
     return res.status(403).json({ message: err.message });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}




