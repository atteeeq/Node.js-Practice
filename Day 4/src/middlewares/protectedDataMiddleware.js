const authenticationMiddleware = (req, res, next) => {
  if (req.headers["secret-key"] == "abcd123") {
    next();
  } else {
    res.json({
      msg: "forbidden, incoorect key!...",
    });
  }
};

export default authenticationMiddleware;
