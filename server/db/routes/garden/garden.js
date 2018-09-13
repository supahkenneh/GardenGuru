const router = require('express').Router();
const moment = require('moment');
const Plant = require('../../models/Plant');
const Crop = require('../../models/Crop');

router.get('/', (req, res) => {

  if (!req.user) {
    return res.send('Please log in to see your garden.');
  } else {
    return Crop
      .where({ owner_id: req.user.id })
      .fetchAll({ withRelated: ['photo', 'cropStatus', 'plant'] })
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
});

router.put('/water', (req, res) => {
  let promises = req.body.map(id => {
    return Crop
      .where({ id })
      .fetchAll()
      .then(crop => {
        let waterInt = crop.models[0].attributes.watering_interval;
        let newWaterDate = moment().add(waterInt, 'd');
        return newWaterDate
      })
      .then(date => {
        return new Crop({ id })
          .save(
            { watering_date: date },
            { patch: true })
          .then(response => {
            return response.refresh()
          })
          .then(response => true)
          .catch(() => false)
      })
  })
  Promise.all(promises)
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }))
})

module.exports = router;