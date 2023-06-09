const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);
// All the URLs of the routes in the api router will be prefixed with /api.

// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

















module.exports = router;
