// Middleware para extrair JWT do header Authorization
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    req.token = authHeader.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};
