module.exports = function (req, res, next) {
  if (req.user) return next();
  res.status(401).json({ message: "Unauthorized" });
};
module.exports = function (req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};
