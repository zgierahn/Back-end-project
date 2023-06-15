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
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    // Review must belong to the current user
    let reviews = await Review.findAll({
        where: {id: req.params.reviewId}
    });

});



//Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    let review = await Review.findByPk(req.params.reviewId);
    if(!review) return res.status(404).json({"message": "Review couldn't be found"})
    if(review.userId !== req.user.dataValues.id) {
        res.status(403);
        res.json({"message": "Forbidden from deleting Review"})
    } else {
        await review.destroy();
        res.json({"message": "Successfully deleted"});
    }
});






module.exports = router;
