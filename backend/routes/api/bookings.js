const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js');



//Get Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
let bookings = await Booking.findAll({
    where: {userId: req.user.dataValues.id},
    include: {model:Spot,
             attributes: {exclude: ['description', 'createdAt', 'updatedAt']},
             include: {model:SpotImage}
            }
});

if(!bookings) {
    res.status(404);
    return res.json({message: "Could not find any bookings"})
}

let bookarray = [];
    bookings.forEach(booking => {
        booking = booking.toJSON();
        for(let each of booking.Spot.SpotImages) {
            if(each.preview) {
            booking.Spot.previewImage = each.url;
            break;
            }
            booking.Spot.previewImage = 'no image';
    }
        delete booking.Spot.SpotImages;
        bookarray.push(booking);
    });

    res.json({Bookings: bookarray});
});



//Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
  let {startDate, endDate} = req.body;
    let booking = await Booking.findByPk(req.params.bookingId);
    if(!booking) {
        res.status(404);
        return res.json({message: "Booking couldn't be found"})
    }
    let spot = await Spot.findOne({
        where: {id: booking.spotId},
        include: {model: Booking}
    });
    if(booking.userId !== req.user.dataValues.id) {
        res.status(403);
        return res.json({message: "Not allowed to edit booking"})
    }
    const err = new Error('Bad Resquest'); //setting up handler
    let error = {};
    let newStartDate = new Date(startDate)
    let today = new Date();
    if(booking.startDate <= today){
      res.status(403);
        return res.json({message: "Not allowed to edit booking already in use"})
    }
    if(newStartDate <= today) {
        error.notCurrent = 'Date must be booked in the future'
    }
    else {
      if(!spot) {
        res.status(404);
        return res.json({message: "Booking couldn't be found"})
      }
      spot = spot.toJSON();
    for(let each of spot.Bookings) {
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
if(startDate <= today){
  error.validstart = "Must be valid start date"
}
if(startDate > endDate) {
    error.validend = "Must be after start date"
}

if(Object.keys(error).length) {
  err.error = error;
  err.statusCode = err.statusCode ? err.statusCode : 400;
  return next(err);
}

let newbooking = await booking.set({
    startDate: startDate,
    endDate: endDate
});

    await newbooking.save();
    res.json(newbooking)
});



//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId);
    if(!booking || booking.userId !== req.user.dataValues.id) {
      res.statusCode = 404;
      return res.json({message: "Spot couldn't be found"});
    }
    let today = new Date();
    if(booking.startDate >= today){
        res.status(403);
        return res.json({"message": "Bookings that have been started can't be deleted"})
    }
    await booking.destroy();
    return res.json({"message": "Successfully deleted"})

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
