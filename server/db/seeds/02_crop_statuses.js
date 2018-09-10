
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('crop_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('crop_statuses').insert([
        {
          name: 'Selling'
        },
        {
          name: 'Growing'
        },
        {
          name: 'Removed'
        },
        {
          name: 'Out of season'
        }
      ]);
    });
};
