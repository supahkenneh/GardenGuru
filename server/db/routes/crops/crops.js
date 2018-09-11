const router = require('express').Router();
const moment = require('moment');

const Crop = require('../../models/Crop');
const CropStatus = require('../../models/CropStatus');
const Plant = require('../../models/Plant');
const Photo = require('../../models/Photo');
const Message = require('../../models/Message');
const User = require('../../models/Message');

router.get('/', (req, res) => {
  console.log('request for crops');
  res.json('crops');
});

router.post('/', (req, res) => {
  let id = req.user.id
  console.log('req.body :', req.body);
  let {
    plant,
    watering,
    month,
    day,
    year,
    garden_description
  } = req.body;
  //YYYY-MM-DD
  console.log(year);
  console.log(month);
  console.log(day);
  let date = moment().year(year).month(month).date(day)
  let watering_date = moment(date).add(watering, 'd');
  return new Crop({
    plant_id: plant,
    watering_interval: watering,
    watering_date: watering_date,
    planted_on: date,
    description: '',
    crop_status: 2,
    owner_id: id,
    garden_description
  })
    .save()
    .then(newCrop => {
      console.log(newCrop);
      return res.json(newCrop);
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return Crop
    .query({ where: { id } })
    .fetch({ withRelated: ['owner', 'cropStatus', 'plant', 'photo', 'messages'] })
    .then(crop => {
      return res.json(crop)
    })
    .catch(err => {
      console.log('err', err);
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return Crop
    .where({ id })
    .fetch()
    .then(crop => {
      let status = crop.attributes.crop_statuses;
      status = 3
      return Crop
        .where({ id })
        .save({ crop_statuses: status }, { patch: true })
        .then(() => {
          res.json({ success: 'true' })
        })
        .catch(err => {
          console.log('err.message', err.message);
        })
    })
})

router.put('/:id', (req, res) => {
  console.log('editing crop');
  res.json('edit specific crop');
});

module.exports = router;