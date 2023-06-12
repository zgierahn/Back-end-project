const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot } = require('../../db/models');




router.get('/', async (req, res) => {
    let allSpots = await Spot.findall();
    res.json(allSpots);
    
});


router.use((req, res, next) => {
    const err = new Error('sorry brah nothing to see here');
    err.statusCode = 404;
    next(err);
  });

  router.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message || "these are not the drones you are looking for",
      stack: err.stack || 'no stack',
      statusCode: statusCode
    })
  });


module.exports = router;
