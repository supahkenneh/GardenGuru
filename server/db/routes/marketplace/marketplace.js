const router = require('express').Router();
const Crop = require('../../models/Crop');
const User = require('../../models/User')
router.get('/', (req, res) => {
  return User
    .query({where: {city : req.user.city}})  
    .orderBy('rating', 'ASC')
    .fetchAll({columns: ['stand_name', 'username']})
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      console.log('error :', err);
    });
});

module.exports = router;