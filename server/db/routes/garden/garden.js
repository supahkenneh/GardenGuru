const router = require('express').Router();
const Plant = require('../../models/Plant');
const Crop = require('../../models/Crop');

router.get('/', (req, res) => {
  
  if (!req.user) {
    return res.send('Please log in to see your garden.');
  } else {
    return Crop
      .where({ owner_id: req.user.id })
      .fetchAll({ withRelated: ['photo', 'cropStatus'] })
      .then(crops => {
        return res.json(crops);
      })
      .catch(err => {
        console.log('error :', err);
      });
  }
});

router.get('/plants', (req, res) => {
  return Plant
    .fetchAll()
    .then(plants => {
      res.json(plants);
    })
})

module.exports = router;