const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const router = express.Router();
const { Op } = require('sequelize');


router.get('/', async (req, res) => {
    let allSpots = await Spot.findAll(
      {include: [{model:SpotImage,
        attributes: ['url']},
        {model:Review}]
    });
    let newarray = [];
    allSpots.forEach(spot => {
      let spotObj = spot.toJSON();
      let {url} = spotObj.SpotImages[0] ? spotObj.SpotImages[0] : {url:'no image'};
      let totalStars = 0;
      for(let review of spotObj.Reviews) {
        totalStars += review.stars
      }
      spotObj.avgRating = totalStars / spotObj.Reviews.length
      delete spotObj.SpotImages;
      delete spotObj.Reviews;
      spotObj.previewImage = url;
      newarray.push(spotObj)
    });

    res.json({Spots:newarray});
});


router.get('/current', async (req, res) => {
  let allSpots = await Spot.findAll({
      where: {ownerId: req.user.dataValues.id },
      include: [{model:SpotImage,
        attributes: ['url']},
        {model:Review}]
  });
  let newarray = [];
  allSpots.forEach(spot => {
    let spotObj = spot.toJSON();
    let {url} = spotObj.SpotImages[0] ? spotObj.SpotImages[0] : {url:'no image'};
    let totalStars = 0;
    for(let review of spotObj.Reviews) {
      totalStars += review.stars
    }
    spotObj.avgRating = totalStars / spotObj.Reviews.length
    delete spotObj.SpotImages;
    delete spotObj.Reviews;
    spotObj.previewImage = url;
    newarray.push(spotObj)
  });

  res.json({Spots:newarray});
});


router.get('/:spotId', async (req, res) => {
  if(!req.params.spotId) {
    //set up error handling
  }
  let spot = await Spot.findByPk(req.params.spotId, {
      include: [{model:SpotImage,
      attributes: ['url']},
      {model:Review}]
  });
  let spotObj = spot.toJSON();
console.log('where is my spot', spotObj);

//loop through reviews, find avgrating - set average rating
//delete reviews

res.json(spot);
});




// router.use((req, res, next) => {
//     const err = new Error('sorry brah nothing to see here');
//     err.statusCode = 404;
//     next(err);
//   });

//   router.use((err, req, res, next) => {
//     console.log(err);
//     const statusCode = err.statusCode || 500;
//     res.status(statusCode);
//     res.json({
//       message: err.message || "these are not the drones you are looking for",
//       stack: err.stack || 'no stack',
//       statusCode: statusCode
//     })
//   });


module.exports = router;
