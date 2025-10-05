import jwt from "jsonwebtoken";

/**
 * Generate JWT token (generic) with error handling
 * @param {Object} payload - data to encode
 * @param {String} secret - JWT secret
 * @param {String} expiresIn - expiration (e.g., "30m", "7d")
 * @returns {String} JWT token
 */
export const generateToken = (payload, secret, expiresIn) => {
  try {
    if (!payload || !secret) {
      throw new Error("Payload and secret are required to generate token");
    }

    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error("❌ Token generation failed:", error.message);
    return null; // return null if token can't be generated
  }
};

/**
 * Generate access and refresh tokens together with error handling
 * @param {Object} user - user object with id and email
 * @returns {Object} { accessToken, refreshToken }
 */
export const generateAuthTokens = (user) => {
  try {
    if (!user || !user.id || !user.email) {
      throw new Error("User object must have id and email");
    }

    const payload = { id: user.id, email: user.email };

    const accessToken = generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.JWT_ACCESS_EXPIRATION || "30m"
    );

    const refreshToken = generateToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_EXPIRATION || "7d"
    );

    if (!accessToken || !refreshToken) {
      throw new Error("Failed to generate tokens");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Auth token generation failed:", error.message);
    return { accessToken: null, refreshToken: null };
  }
};
