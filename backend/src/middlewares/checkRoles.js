const checkRoles = () => {
  return (req, res, next) => {
    const userRoles = req.user;

    if (userRoles.roles === "admin") {
      return next();
    }

    return res.status(404).json({ message: "you aren't admin" });
  };
};
module.exports = checkRoles;
