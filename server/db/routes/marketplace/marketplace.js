const router = require('express').Router();
const Crop = require('../../models/Crop');
const User = require('../../models/User')
router.get('/', (req, res) => {
  return User
    .query({where: {city : req.user.city}})  
    .orderBy('rating', 'ASC')
    .fetchAll()
    .then(response => {
      return res.json(response);
    })
    .catch(err => {
      console.log('error :', err);
    });
});

module.exports = router;
