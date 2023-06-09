'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: 'amazing, very expensive, but worth it',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Pretty cool spot',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'really enjoyed my stay',
        stars: 5
      },
      {
        spotId: 4,
        userId: 3,
        review: 'average for the location',
        stars: 3
      },
      {
        spotId: 4,
        userId: 1,
        review: 'liked it',
        stars: 4
      },
      {
        spotId: 5,
        userId: 3,
        review: 'loved it',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'pricey',
        stars: 3
      },
      {
        spotId: 7,
        userId: 2,
        review: 'good spot',
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3,4,5,6,7,8] }
    }, {});
  }
};
