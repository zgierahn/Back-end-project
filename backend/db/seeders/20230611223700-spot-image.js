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
        spotId: 1,
        url:'https://www.cabinsforyou.com/public/img/gatlinburg-cabin-rentals-drone-hero.jpg',
        preview: false
      },
      {
        spotId: 1,
        url:'https://www.cabinsforyou.com/public/img/cabins/large/gatlinburg-cabin-morningside-living-room-11.jpg',
        preview: false
      },
      {
        spotId: 1,
        url:'https://www.cabinsforyou.com/public/img/cabins/large/pigeon-forge-cabin-majestic-mountian-waters-recreation-3.jpg',
        preview: false
      },
      {
        spotId: 1,
        url:'https://cdn.liverez.com/5/13408/1/154703/800/1.jpg',
        preview: false
      },
      {
        spotId: 2,
        url:'https://www.escapetoblueridge.com/images/north-georgia-blue-ridge-cabins.jpg',
        preview: true
      },
      {
        spotId: 2,
        url:'https://8dd5301af4f8a70ce74b-6a41f9bd1b7f26c4c9ed7d9eb602c1ac.ssl.cf5.rackcdn.com/432760/GibbsMountain11.jpg',
        preview: false
      },
      {
        spotId: 2,
        url:'https://8dd5301af4f8a70ce74b-6a41f9bd1b7f26c4c9ed7d9eb602c1ac.ssl.cf5.rackcdn.com/432760/GibbsMountain9.jpg',
        preview: false
      },
      {
        spotId: 2,
        url:'https://8dd5301af4f8a70ce74b-6a41f9bd1b7f26c4c9ed7d9eb602c1ac.ssl.cf5.rackcdn.com/432760/GibbsMountain21.jpg',
        preview: false
      },
      {
        spotId: 3,
        url:'https://www.tahoesouthvacationrentals.com/gallery/prop_1639_1564694897_17_bedroom_18_bath_powder_house_lodge_at_heavenly_ski_in_ski_out_with_indoor_pool_on_15_acres.jpg',
        preview: true
      },
      {
        spotId: 3,
        url:'https://www.tahoesouthvacationrentals.com/gallery/prop_1639_1564694993_17_bedroom_18_bath_powder_house_lodge_at_heavenly_ski_in_ski_out_with_indoor_pool_on_15_acres.jpg',
        preview: false
      },
      {
        spotId: 3,
        url:'https://www.tahoesouthvacationrentals.com/gallery/prop_1639_1564694935_17_bedroom_18_bath_powder_house_lodge_at_heavenly_ski_in_ski_out_with_indoor_pool_on_15_acres.jpg',
        preview: false
      },
      {
        spotId: 3,
        url:'https://www.tahoesouthvacationrentals.com/gallery/prop_1639_1564695075_17_bedroom_18_bath_powder_house_lodge_at_heavenly_ski_in_ski_out_with_indoor_pool_on_15_acres.jpg',
        preview: false
      },
      {
        spotId: 3,
        url:'https://www.tahoesouthvacationrentals.com/gallery/prop_1639_1564695171_17_bedroom_18_bath_powder_house_lodge_at_heavenly_ski_in_ski_out_with_indoor_pool_on_15_acres.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/products/2019/2/11/RX_Airbnb_CatskillA-frame.jpg.rend.hgtvcom.616.770.suffix/1549916037153.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url:'https://travel.home.sndimg.com/content/dam/images/travel/products/2019/9/18/rx_getaway_getaway-cabins-nationwide.jpeg.rend.hgtvcom.966.725.suffix/1568826397884.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url:'https://travel.home.sndimg.com/content/dam/images/travel/products/2019/9/18/rx_vrbo_earlysville-virginia.jpeg.rend.hgtvcom.966.644.suffix/1568827186017.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url:'https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2018/1/5/CI_Airbnb_CozyCabins_BigBearCityCalifornia-2.jpg.rend.hgtvcom.966.644.suffix/1515167416717.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://l.icdbcdn.com/oh/74dc8c18-5b98-4e83-a41f-21a0deda0e01.jpg',
        preview: false
      },
      {
        spotId: 5,
        url:'https://a0.muscache.com/im/pictures/8f14b578-1954-4ef0-9045-2ec8fe50379e.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url:'https://a0.muscache.com/im/pictures/f94c523d-e7c6-42e1-9ba0-654325f34c3e.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url:'https://a0.muscache.com/im/pictures/c83a6e74-a8cb-41d2-bb8f-e613ab4af168.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url:'https://a0.muscache.com/im/pictures/c4b7f085-ad9f-48a9-8ebb-dc1a5b039cc8.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url:'https://a0.muscache.com/im/pictures/c42e4d40-76c4-4e56-a7dd-94c38ad6487b.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url:'https://a0.muscache.com/im/pictures/2d06abb1-0ad4-46e2-959d-fccc6c6eb04a.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url:'https://a0.muscache.com/im/pictures/b2724623-86ca-4dfb-8ab1-9743f0f53f94.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url:'https://a0.muscache.com/im/pictures/fb028011-0bb5-445e-a4c3-5a24022a5198.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url:'https://a0.muscache.com/im/pictures/b5c2ba31-0908-41cc-ab0f-fd5531f3395c.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url:'https://a0.muscache.com/im/pictures/909edec9-bb0d-4548-bc15-f0cc50d4ad6c.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613800132617051942/original/490ce3a6-3bf2-45be-b8be-e3ffae454637.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613800132617051942/original/77d6951f-bb09-483f-b2e7-b7115867ce20.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613800132617051942/original/1bddd703-8c9f-4c9b-b26e-aa4d4588deb8.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613800132617051942/original/0df00d69-f1c4-453b-89a5-cc2051240b96.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613800132617051942/original/3143b005-2c2b-4d5c-9da5-7759b94910c5.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-782168068686332717/original/da5b425c-1c9e-4fa1-a75e-494339eaf9ca.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-782168068686332717/original/5be33fc9-78c7-4d56-bee7-049331535726.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-782168068686332717/original/8fd7a195-9073-463f-8275-099d3c8b42a9.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-782168068686332717/original/b664544a-6620-4b87-ab65-b6364d30e0ff.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-782168068686332717/original/35df2c23-23e4-47a4-ac74-70c769c21e77.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-929678468447098713/original/cf15666b-87ac-4644-9d7a-2304b31a9933.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 9,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-929678468447098713/original/fcb37aba-2759-4dc8-aa98-5bcf83590862.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-929678468447098713/original/a48ed1e2-e077-46d0-b829-8448d3292188.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-929678468447098713/original/02368873-2928-48fa-b323-5c9d130ec462.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-929678468447098713/original/9f4ab9a0-53a5-4d5e-8263-97e1adae73de.jpeg?im_w=1200',
        preview: false
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
