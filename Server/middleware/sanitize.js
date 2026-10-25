// middleware/sanitize.js
const mongoSanitize = require('mongo-sanitize');

// Strictly scrub every incoming body/query/param key that MongoDB would interpret
// as an operator ($ne, $gt, $where, ...) — the core NoSQL injection defense.
// Also coerces dangerous values so "{$ne: null}" style payloads cannot survive.
const sanitize = (req, res, next) => {
  if (req.body && typeof req.body === 'object') req.body = mongoSanitize(req.body);
  if (req.params && typeof req.params === 'object') req.params = mongoSanitize(req.params);

  // Express 5 exposes req.query through a getter-only accessor on the request
  // prototype, so a plain `req.query = ...` assignment is silently ignored and
  // the scrubber would be a no-op for query strings. Shadow the inherited
  // accessor with an own data property so downstream handlers read the clean
  // object. (Own-property creation only requires the instance to be extensible.)
  if (req.query && typeof req.query === 'object') {
    Object.defineProperty(req, 'query', {
      value: mongoSanitize(req.query),
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }
  next();
};

module.exports = sanitize;
