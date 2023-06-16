const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js');




//DELETE a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await SpotImage.findByPk(req.params.imageId,
        {include: {model:Spot}
    });
    if(!image || image.Spot.ownerId !== req.user.dataValues.id) {
      res.statusCode = 404;
      return res.json({message: "Spot couldn't be found"});
    }
    await image.destroy();
    return res.json({"message": "Successfully deleted"})
  });










module.exports = router;
