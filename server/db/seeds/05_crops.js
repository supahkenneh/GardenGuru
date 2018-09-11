
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('crops').del()
    .then(function () {
      // Inserts seed entries
      return knex('crops').insert([
        {
          description: 'Lemons',
          details: 'Lemon tree',
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
