import { ulid } from 'ulid';

function reqInfoMiddleware(req, res, next) {
  req.info = {
    id: ulid(),
    headers: req.headers,
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  };

  return next();
}

export default reqInfoMiddleware;
