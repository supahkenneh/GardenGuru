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
  //sets the next watering_date
  let date = moment().year(year).month(month).date(day)
  let watering_date = moment(date).add(watering, 'd');
  let convertedWateringDate = moment(watering_date).local().format('YYYY-MM-DD HH:mm:ss');
  return Plant
    .where({ id: plant })
    .fetchAll()
    .then(plant => {
      let harvestDays = plant.models[0].attributes.days_to_harvest;
      let harvest_date = moment(date).add(harvestDays, 'd');
      return harvest_date
    })
    .then(harvest_date => {
      return new Crop({
        plant_id: plant,
        watering_interval: watering,
        watering_date: convertedWateringDate,
        planted_on: date,
        garden_description,
        description: '',
        crop_status: 2,
        owner_id: id,
        garden_description,
        harvest_date
      })
        .save()
        .then(newCrop => {
          return res.json(newCrop);
        })
    })
});

router.post('/search/:term', (req, res) => {
  const search = req.params.term;
  return Crop
    .query(qb => {
      if (req.body.plants) {
        qb.where('plant_id', '=', req.body.plants)
          .andWhere('description', 'ILIKE', `${search}%`);
      } else {
        qb.where('description', 'ILIKE', `${search}%`);
      };
    })
    .fetchAll()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log('err', err);
    });
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
      console.log('crop status', crop)
      let status = crop.attributes.crop_status;
      status = 3
      return Crop
        .where({ id })
        .save({ crop_status: status }, { patch: true })
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