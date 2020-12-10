import jwt from "jsonwebtoken";

const generateJwtToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7 days" });
export default generateJwtToken;
