
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('crops').del()
    .then(function () {
      // Inserts seed entries
      return knex('crops').insert([
        {
          description: 'Lemon',
          details: 'Yellow fruit known for its tangy taste, the juice and rinds each used for both culinary and non-culinary purposes. Lemon trees are to be watered deeply each week.',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$2',
          crop_statuses: 2,
          owner_id: 1,
          plant_id: 1,
        },
        {
          description: 'Blueberry',
          details: 'Shallow-rooted perennial plants that produce small blue- or purple-colored berries, and are native to North America. They typically have a sweet taste upon reaching maturity, though they also have varying acidity. Thrives in acidic soils of 4-5 pH, and requires 1-2 inches of water weekly, increasing to 4 inches while the fruit ripens.',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$2',
          crop_statuses: 2,
          owner_id: 1,
          plant_id: 2,
        },
        {
          description: 'Cherry',
          details: 'A fruit of which its name can refer to many things such as cherry wood, almonds, or cherry blossoms. Like some other trees, cherry seeds need to be exposed to the cold in order to germinate which can be done by planting them in autumn, or by first refrigerating the seeds in order to mimic the process before planting in the spring. Keep the soil moist by watering once every 7-10 days.',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$4',
          crop_statuses: 1,
          owner_id: 1,
          plant_id: 3,
        },
        {
          description: 'Apple',
          details: 'Widely known and cultivated around the world, apples are often used in various ways such as cooking, for ciders, or eating raw. Can be planted in the autumn, provided the weather is more moist in the winter as well. Apple trees need much sunlight, and grow with enough water in the soil to still allow air flow. Water deeply 1-2 times weekly when young and growing.',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$3',
          crop_statuses: 2,
          owner_id: 2,
          plant_id: 4,
        },
        {
          description: 'Strawberry',
          details: 'Popular fruit identifiable by its bright red skin and the seeds on it, and cultivated worldwide for the fruit. Typically grown in cooler climates, they are difficult to grow in in warmer climates of around 29C or higher, but possible with proper preparations. As shallow-rooted plants, one must be mindful of watering too much or too little, so a weekly inch of water will do.',
          planted_on: null,
          watering_interval: 7,
          inventory: 0,
          price: '$5',
          crop_statuses: 1,
          owner_id: 2,
          plant_id: 4,
        }
      ]);
    });
};
