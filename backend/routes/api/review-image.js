const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js');



//DELETE a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await ReviewImage.findByPk(req.params.imageId,
        {include: {model:Review}
    });
    console.log('yes i wanna see this', image);
    if(!image || image.Review.userId !== req.user.dataValues.id) {
      res.statusCode = 404;
      return res.json({message: "Spot couldn't be found"});
    }
    await image.destroy();
    return res.json({"message": "Successfully deleted"})
  });









module.exports = router;
