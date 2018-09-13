exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'testuser',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'grobrotest@gmail.com',
          first_name: 'John',
          last_name: 'Doe',
          rating: 0,
          bio: 'Gardening is my hobby.',
          city: 'Honolulu',
          state: 'Hawaii',
          stand_name: 'Crops by John',
          avatar_link: 'https://myspace.com/common/images/user.png'
        },
        {
          username: 'jojoestar',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'grobroadmin@gmail.com',
          first_name: 'Joseph',
          last_name: 'Evans',
          rating: 0,
          bio: '',
          city: 'Dallas',
          state: 'Texas',
          stand_name: "Joseph's Stand"
        },
        {
          username: 'alexander12',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'alexanderthegreat21@gmail.com',
          first_name: '',
          last_name: '',
          rating: 0,
          bio: '',
          city: 'Honolulu',
          state: 'Hawaii',
          stand_name: "Iskandar's Organic Veggies"
        },
        {
          username: 'tsuyun',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'froppy@gmail.com',
          first_name: '',
          last_name: '',
          rating: 0,
          bio: '',
          city: 'Dallas',
          state: 'Texas',
          stand_name: 'Fresh Fruits of Froppy'
        },
        {
          username: 'muibirb',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'muibirb@gmail.com',
          first_name: '',
          last_name: '',
          rating: 0,
          bio: '',
          city: 'Miami',
          state: 'Florida',
          stand_name: ''
        },
        {
          username: 'merurun16',
          password:
            '$2b$12$HueRLBiASdSjLQA.EC9P6O3NeA0OTAGCl/22O.t2axPDe.oZPOJTO',
          email: 'merurun16@gmail.com',
          first_name: '',
          last_name: '',
          rating: 0,
          bio: '',
          city: 'Miami',
          state: 'Florida',
          stand_name: ''
        }
      ]);
    });
};
