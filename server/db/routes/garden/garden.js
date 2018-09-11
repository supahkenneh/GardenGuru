const router = require('express').Router();
const Plant = require('../../models/Plant');
const Crop = require('../../models/Crop');
const CropStatus = require('../../models/CropStatus');

router.get('/', (req, res) => {
  const id = req.user.id;
  return Crop
    .where({ owner_id: id })
    .fetch({withRelated: ['cropStatus']})
    .then(crops => {
      res.json(crops)
    })
});

router.get('/plants', (req, res) => {
  return Plant
    .fetchAll()
    .then(plants => {
      res.json(plants);
    })
})

module.exports = router;