
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('crops').del()
    .then(function () {
      // Inserts seed entries
      return knex('crops').insert([
        {
          description: 'Lemons',
          details: 'Lemon tree',
          garden_description: 'Lemon tree',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$2',
          crop_status: 2,
          owner_id: 1,
          plant_id: 1,
        },
        {
          description: 'Blueberries',
          details: 'Lowbush',
          garden_description: 'blueberryyy',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$2',
          crop_status: 2,
          owner_id: 1,
          plant_id: 2,
        },
        {
          description: 'Cherries',
          details: 'Sour cherries.',
          garden_description: 'cherryyy',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$4',
          crop_status: 1,
          owner_id: 1,
          plant_id: 3,
        },
        {
          description: 'Apples',
          details: 'fuji apples',
          garden_description: 'appooool',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$3',
          crop_status: 2,
          owner_id: 2,
          plant_id: 4,
        },
        {
          description: 'Strawberries',
          details: 'wild strawberries',
          garden_description: 'strewberri',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$5',
          crop_status: 1,
          owner_id: 2,
          plant_id: 4,
        }
      ]);
    });
};
