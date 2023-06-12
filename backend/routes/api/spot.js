const express = require('express');
const { Spot, SpotImage } = require('../../db/models');
const router = express.Router();
const { Op } = require('sequelize');




router.get('/', async (req, res) => {
    let allSpots = await Spot.findAll(
      {include: {model:SpotImage,
        // where: {preview : true},
        attributes: [['url', 'previewImage']]
      }

    });
    let images = await SpotImage.findAll({
      where: {preview: true}
    });

    console.log('whats in the array', allSpots[0].dataValues.SpotImages);
// console.log('allspots', allSpots);
//     allSpots.forEach(spot => {
//       let {url} = spot.SpotImages[0] ? spot.SpotImages[0] : {url:'no image'}
//     });
// console.log('what have we done', allSpots);
    res.json(allSpots);

});


// router.get('/', async(req,res)=>{
//   let spot = await Spot.findAll({
//       include:
//     {model:SpotImage,
//       where:{preview:true},

//         attributes: ['url'],
//       //   through: { attributes: [] },
//       // required: true,

//         }
//   })
//   res.json(spot)
// })


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
