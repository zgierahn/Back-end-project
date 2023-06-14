const router = require('express').Router();
const reviewRouter = require('./review.js');
const sessionRouter = require('./session.js');
const spotRouter = require('./spot.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');


router.use(restoreUser);

router.use('/reviews', reviewRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});







module.exports = router;
