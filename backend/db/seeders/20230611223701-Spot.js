'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Street',
        city: 'Tahoe',
        state: 'California',
        country: 'USA',
        lat: 60,
        lng: 90,
        name: 'The grey cabin',
        description: 'Awesome place to chill year round',
        price: 10000
      },
      {
        ownerId: 1,
        address: '456 Street',
        city: 'Tahoe',
        state: 'California',
        country: 'USA',
        lat: 60.1,
        lng: 90.1,
        name: 'The brown cabin',
        description: 'Another amazing place year round',
        price: 750
      },
      {
        ownerId: 1,
        address: '789 Street',
        city: 'South Lake Tahoe',
        state: 'California',
        country: 'USA',
        lat: 65,
        lng: 90,
        name: 'SouthLake cabin',
        description: 'The epic south lake spot',
        price: 650
      },
      {
        ownerId: 2,
        address: '147 Street',
        city: 'Boulder',
        state: 'Colorado',
        country: 'USA',
        lat: 60,
        lng: 120,
        name: 'Small house in the mountains',
        description: 'Another great place to visit year round',
        price: 500
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address:{ [Op.in]: ['123 Street', '456 Street', '789 Street', '147 Street']}
    }, {});
  }
};
