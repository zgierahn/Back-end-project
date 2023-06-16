const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js');


//GET all spots
router.get('/', async (req, res, next) => {
  let error = {};
  let {page, size} = req.query;
  if(!size || size > 20) size = 20;
  if(size < 1) error.size = "Size must be greater than or equal to 1";
  if(page < 1) error.page = "Page must be greater than or equal to 1";
  if(!page) page = 1;
  if(page >= 10) page = 10;

    page = parseInt(page);
    size = parseInt(size);
    let pagination = {};

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    let allSpots = await Spot.findAll(
      {include: [{model:SpotImage,
        attributes: ['url']},
        {model:Review}],
        ...pagination
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

    if(Object.keys(error).length) {
      const err = new Error('Bad Resquest');
      err.error = error;
      err.statusCode = 400;
      return next(err);
    }

    res.json({Spots:newarray, page, size });
});



//CREATE a new spot
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



//GET spots of current user
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



//GET spot by Id
router.get('/:spotId', async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [{model:SpotImage,
      attributes: ['id', 'url', 'preview']},
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



//EDIT an existing spot
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



//CREATE an image for spot by spot Id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const {url, preview} = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if(spot.ownerId !== req.user.dataValues.id || !spot) {
      res.statusCode = 404;
      return res.json({"message": "Spot couldn't be found"})
  }
  const newImage = await SpotImage.create({
        spotId: spot.id,
        url: url,
        preview: preview
  })
  res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview
  });
});



//GET all reviews by Spot Id
router.get('/:spotId/reviews', async (req, res) => {
  let reviews = await Spot.findByPk(req.params.spotId,{
    attributes: [],
    include: [{model:Review,
      include: [{model:User, as:'User',
      attributes:['id', 'firstName', 'lastName']},
      {model:ReviewImage,
        attributes:['id', 'url']}]
      }]
    });

  if(!reviews) {
      res.status(404);
      res.json({"message": "Spot couldn't be found"});
  }
      res.json(reviews);
});



//Create a Review based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;
  let error = {};
  let sessionUser = req.user.dataValues.id;
  let spot = await Spot.findByPk(req.params.spotId);
  if(!spot) {
    res.status(404).json({"message": "Spot couldn't be found"})
  }

  let userReviews = await Review.findAll({
    where: {userId: sessionUser,
            spotId: spot.id}
  });

if(userReviews.length) {
 return  res.status(403).json(
  {"message": "User already has a review for this spot"});
};

  let newReview = await Review.build({
    userId: sessionUser ? sessionUser : error.sessionUser = 'Session user is required',
    spotId: spot.id,
    review: review ? review : error.review = "Review text is required",
    stars: stars > 0 && stars < 6 ? stars : error.stars = "Stars must be an integer from 1 to 5"
});

if(Object.keys(error).length) {
  const err = new Error('Bad Resquest');
  err.error = error;
  err.statusCode = 400;
  return next(err);
}

await newReview.save();
res.json(newReview)
});



//Get Bookings based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  let spotBookings = await Spot.findByPk(req.params.spotId,{
    attributes: ['ownerId'],
    include: {model:Booking,
              // attributes:['spotId', 'startDate', 'endDate'],
              include:{model:User, as: "User",
              attributes: ["id", 'firstName', 'lastName']}},
    });

if(!spotBookings){
  res.status(404);
  return res.json({"message": "Spot couldn't be found"})
}

spotBookings = spotBookings.toJSON();

if(spotBookings.ownerId !== req.user.dataValues.id){
  let newBookingArray = []
  for(let booking of spotBookings.Bookings){

    let newObj = {
      "spotId": booking.spotId,
      "startDate": booking.startDate,
      "endDate": booking.endDate
    }
  newBookingArray.push(newObj)
  }
  return res.json({Bookings:newBookingArray})
}

delete spotBookings.ownerId
  res.json(spotBookings)
});



//Create Booking based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  // Spot must NOT belong to the current user
  const err = new Error('Bad Resquest'); //setting up handler
  let error = {};
let {startDate, endDate} = req.body;
let spotBookings = await Spot.findByPk(req.params.spotId,{
  attributes: ['ownerId'],
  include: {model:Booking,
            include:{model:User, as: "User",
            attributes: ["id", 'firstName', 'lastName']}},
  });
  if(!spotBookings) {
    res.status(404);
    return res.json({"message": "Spot couldn't be found"})
  }
if(spotBookings.ownerId === req.user.dataValues.id) {
  res.status(403);
  return res.json({message: 'Not authorized to book your own spot'})
}
let newStartDate = new Date(startDate)
let today = new Date();
if(newStartDate <= today) {
  error.notCurrent = 'Date must be booked in the future'
}
else {
  spotBookings = spotBookings.toJSON();
  for(let each of spotBookings.Bookings) {
    if(startDate >= each.startDate && startDate <= each.endDate){
      error.startDate = 'startDate cannot overlap bookings'
      err.statusCode = 403;
      err.message = "Sorry, this spot is already booked for the specified dates"
    }
    if(endDate >= each.startDate && endDate <= each.endDate){
      error.endDate = "endDate cannot overlap bookings"
      err.statusCode = 403;
      err.message = "Sorry, this spot is already booked for the specified dates"
    }
  }
}

let newBooking = await Booking.create({
  spotId: req.params.spotId,
  userId: req.user.dataValues.id,
  startDate: startDate,
  endDate: endDate
})

if(Object.keys(error).length) {
  err.error = error;
  err.statusCode = err.statusCode ? err.statusCode : 400;
  return next(err);
}

  res.json(newBooking)
});



//Error handler
  router.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message || "Bad Request",
      error: err.error || 'error'
    })
  });


module.exports = router;
