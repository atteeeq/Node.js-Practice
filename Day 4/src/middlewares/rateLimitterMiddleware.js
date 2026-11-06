import { counter, limit } from "../utils/globalVariables.js";

const rateLimitterMiddleware = (req, res, next) => {
  if (counter >= limit) {
    res.json({
      msg: "Rate limit exceeds...",
    });
  } else {
    next();
  }
};

export default rateLimitterMiddleware;
