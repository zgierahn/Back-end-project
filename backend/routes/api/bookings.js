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
        console.log('booking object', booking.Spot);
        for(let each of booking.Spot.SpotImages) {
        console.log('each preview', each);
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
router.put('/:bookingId', requireAuth, async (req, res) => {

    res.json('Success!')
});



//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {

    res.json('Success!')
});










module.exports = router;
