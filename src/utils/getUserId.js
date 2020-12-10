import jwt from "jsonwebtoken";

const getUserId = (request, requireAuth = true) => {
  const header = request.req ? request.req.headers.authorization : request.connection.context.Authorization;

  if (header) {
    const [_, token] = header.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  }

  if (requireAuth) throw new Error("Authentication required");

  return null;
};

export { getUserId as default };
