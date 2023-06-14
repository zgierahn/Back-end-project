const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js')


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


router.post('/', requireAuth, async (req, res, next) => {
  let error = {};
  const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.build({
      ownerId: req.user.dataValues.id ? req.user.dataValues.id : 'Must be logged in to create new place',
      address: address ? address : error.address='Street is required',
      city: city ? city : error.city = 'City is required',
      state: state ? state : error.state = 'State is required',
      country: country ? country : error.country = 'Country is required',
      lat: lat ? lat : error.lat = 'Latitude is not valid',
      lng: lng ? lng : error.lng = 'Longitude is not valid',
      name: name ? name : error.name = 'Name must be less than 50 characters',
      if(name) {
        if(name.length > 50) error.name = 'Name must be less than 50 characters'
      },
      description: description ? description : error.description = 'Description is required',
      price: price ? price : error.price = 'Price per day is required'
    });

if(Object.keys(error).length) {
  const err = new Error('Bad Resquest');
  err.error = error;
  err.statusCode = 400;
  return next(err);
}
   await newSpot.save();
  res.json(newSpot);
});


router.get('/current', requireAuth, async (req, res) => {
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
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [{model:SpotImage,
      attributes: ['url']},
      {model:Review},
      {model:User, as: 'Owner',
      attributes:['id', 'firstName', 'lastName']}]
  });
    if(!spot) {
      res.statusCode = 404;
      return res.json({message: "Spot couldn't be found"});
    }
    let spotObj = spot.toJSON();
    let totalStars = 0;
    for(let review of spotObj.Reviews) {
      totalStars += review.stars
    }
    spotObj.avgRating = totalStars / spotObj.Reviews.length
    delete spotObj.Reviews;

res.json(spotObj);
});


router.put('/:spotId', requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if(!spot || spot.ownerId !== req.user.dataValues.id) {
    res.statusCode = 404;
    return res.json({message: "Spot couldn't be found"});
  }
  let error = {};
  const {address, city, state, country, lat, lng, name, description, price} = req.body
     await spot.set({
      ownerId: req.user.dataValues.id ? req.user.dataValues.id : 'Must be logged in to create new place',
      address: address ? address : error.address='Street is required',
      city: city ? city : error.city = 'City is required',
      state: state ? state : error.state = 'State is required',
      country: country ? country : error.country = 'Country is required',
      lat: lat ? lat : error.lat = 'Latitude is not valid',
      lng: lng ? lng : error.lng = 'Longitude is not valid',
      name: name ? name : error.name = 'Name must be less than 50 characters',
      if(name) {
        if(name.length > 50) error.name = 'Name must be less than 50 characters'
      },
      description: description ? description : error.description = 'Description is required',
      price: price ? price : error.price = 'Price per day is required'
    });

    if(Object.keys(error).length) {
      const err = new Error('Bad Resquest');
      err.error = error;
      err.statusCode = 400;
      return next(err);
    }
       await spot.save();
      res.json(spot);
});


router.post('/:spotId/images', requireAuth, async (req, res) => {
  const {url, preview} = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if(spot.ownerId !== req.user.dataValues.id || !spot) {
      res.statusCode = 404;
      return res.json({"message": "Spot couldn't be found"})
  }
  const newImage = await SpotImage.create({
        spotId: spot.id,
        url: 'fresh new image',
        preview: true
  })
  res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview
  });
});


// router.use((req, res, next) => {
//     const err = new Error('sorry brah nothing to see here');
//     err.statusCode = 404;
//     next(err);
//   });

  router.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message || "Bad Request",
      error: err.error || 'error'
    })
  });


module.exports = router;
