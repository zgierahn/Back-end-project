'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url:'https://www.cabinsforyou.com/public/img/luxury-gatlinburg-cabin-rental-hero.jpg',
        preview: true
      },
      {
        spotId: 2,
        url:'https://www.escapetoblueridge.com/images/north-georgia-blue-ridge-cabins.jpg',
        preview: true
      },
      {
        spotId: 3,
        url:'https://www-vacasa.imgix.net/30217_Morgantown_GA_cabin.jpg?auto=format%2Ccompress&fit=crop&h=1200&ixlib=python-3.2.0&q=45&w=1600&s=0da07cb45cfd3997e683b2e49c1f2ffa',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/products/2019/2/11/RX_Airbnb_CatskillA-frame.jpg.rend.hgtvcom.616.770.suffix/1549916037153.jpeg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4] }
    }, {});
  }
};
