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
    let review = await Review.findOne({
        where: {id: req.params.reviewId,
            userId: req.user.dataValues.id},
            include: {model:ReviewImage}
    });
    if(!review) {
        res.status(404);
        res.json({"message": "Review couldn't be found"});
    }
    const { url } = req.body;
    if(!url) return res.status(400).json({'message': "must provide a url"})

    review = review.toJSON();
    if(review.ReviewImages.length > 10) {
         res.status(403)
       return res.json({'message': "Maximum number of images for this resource was reached"})
    }

    let reviewImage = await ReviewImage.build({
            reviewId : review.id,
            url: url
    });
    await reviewImage.save();
    reviewImage = reviewImage.toJSON();

    res.json({
        id: reviewImage.id,
        url: reviewImage.url
    })
});


router.put('/:reviewId', requireAuth, async (req, res) => {

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




//Error handler
router.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message || "Bad Request",
      error: err.error || 'error'
    })
  });


//npm install moment - can manipulate dates

module.exports = router;
