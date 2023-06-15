const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js');

//Get all Reviews of Current User
router.get('/current',  requireAuth, async (req, res) => {
    let reviews = await Review.findAll({
        where:{ userId:  req.user.dataValues.id},
        include: [{model:User,
            attributes: ['id', 'firstName', 'lastName']},
                {model:Spot,
                attributes: {exclude: ['description', 'createdAt', 'updatedAt']},
                include:{model:SpotImage}},
                    {model: ReviewImage,
                        attributes: ['id', 'url']}
    ]});

    let answer = [];
    reviews.forEach(review => {
        review = review.toJSON();
        console.log('review object', review.Spot.SpotImages);
        for(let each of review.Spot.SpotImages) {
            if(each.preview) {
                review.Spot.previewImage = each.url;
                break;
            }
            review.Spot.previewImage = 'no image';
        }
        delete review.Spot.SpotImages
        answer.push(review)
    });

      res.json({Reviews:answer});
});


//Add Image to Review based on Review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {


});







module.exports = router;
