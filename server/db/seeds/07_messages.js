
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          to: 2,
          from: 1,
          content: 'Hello, I would like to buy some of your strawberries. Where is a good place to meet up? I\'m free everyday after 4pm.',
          read: false
        },
        {
          to: 1,
          from: 3,
          content: 'Hey I saw that you have some cherries up. What kind of cherries are they?',
          read: false
        },
        {
          to: 1,
          from: 2,
          content: 'How many cherries do you have left? I\'m looking to buy a lot. Are you willing to haggle for them?',
          read: false
        }
      ]);
    });
};
