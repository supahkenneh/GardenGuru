exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          username: 'johngardener',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'grobrotest@gmail.com',
          first_name: 'John',
          last_name: 'Doe',
          rating: 0,
          bio: 'Gardening is my hobby. I grow mostly mangoes and avocados. DM me for batches',
          city: 'Honolulu',
          state: 'HI',
          stand_name: 'Mango Madness',
          avatar_link: 'https://asphaltgold.de/media/catalog/product/cache/1/image/930x669/0f396e8a55728e79b48334e699243c07/s/t/st_ssy_stock_cap_black_1.jpg'
        },
        {
          username: 'jojoestar',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'grobroadmin@gmail.com',
          first_name: 'Joseph',
          last_name: 'Evans',
          rating: 0,
          bio: `Helping my parents sell their veggies.`,
          city: 'Honolulu',
          state: 'HI',
          stand_name: "Joseph's Stand"
        },
        {
          username: 'alex12',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'alexanderthegreat21@gmail.com',
          first_name: 'Alexis',
          last_name: 'Snow',
          rating: 0,
          bio: `It ain't over lentil it's over!`,
          city: 'Honolulu',
          state: 'HI',
          stand_name: "Alex's Organic Veggies",
          avatar_link: 'https://files.slack.com/files-pri/T0253FV7X-FCVFB5SV6/20180918_111114.jpg'
        },
        {
          username: 'thelegend27',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'froppy@gmail.com',
          first_name: 'Harry',
          last_name: 'Potter',
          rating: 0,
          bio: 'Herb your enthusiasm',
          city: 'Honolulu',
          state: 'HI',
          stand_name: `Harry's Herbs`,
          avatar_link: ''
        },
        {
          username: 'mint',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'muibirb@gmail.com',
          first_name: 'Jessica',
          last_name: 'Soo',
          rating: 0,
          bio: 'My plants are mint condition!',
          city: 'Aiea',
          state: 'HI',
          stand_name: 'Mint to be'
        },
        {
          username: 'aiea1',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'merurun16@gmail.com',
          first_name: 'Mandy',
          last_name: 'Simons',
          rating: 0,
          bio: `Hi! I love gardening!`,
          city: 'Aiea',
          state: 'HI',
          stand_name: `Mandy's Market`
        }
      ]);
    });
};
