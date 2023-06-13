const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
const router = express.Router();
const { Op } = require('sequelize');




router.get('/', async (req, res) => {
    let allSpots = await Spot.findAll(
      {include: {model:SpotImage,
        // where:{preview:true}, //no filtering
        attributes: ['url']}
    });
    // let images = await SpotImage.findAll({
    //   where: {preview: true}
    // });

    let newarray = [];
    allSpots.forEach(spot => {
      let spotObj = spot.toJSON();
      let {url} = spotObj.SpotImages[0] ? spotObj.SpotImages[0] : {url:'no image'};
      delete spotObj.SpotImages;
      spotObj.previewImage = url;
      newarray.push(spotObj)
    });

    res.json({Spots:newarray});

});

// router.get('/', async(req,res)=>{
//   let answer=[]
//   let spot = await Spot.findAll({
//       include:[
//       {model:SpotImage,
//         where:{preview:true},  //can't use where clause
//         attributes: ['url'],
//         }
//       ]
//   });
//  let reviews = await Review.findAll();


//   const spots=spot.map((spot)=> {
//     let {url} = spot.SpotImages[0]? spot.SpotImages[0]:{url:null};
//     console.log('url', url);  //url does not show up
//     let place =spot.toJSON()
//     console.log('spot', place);
//   delete place.SpotImages
//   place.previewImage = url
//   answer.push(place)
// } )
//   res.json({Spots:answer}) //

// });




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
