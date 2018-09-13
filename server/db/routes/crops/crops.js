const router = require('express').Router();
const moment = require('moment');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Crop = require('../../models/Crop');
const CropStatus = require('../../models/CropStatus');
const Plant = require('../../models/Plant');
const Photo = require('../../models/Photo');
const Message = require('../../models/Message');
const User = require('../../models/Message');

// const BUCKET_NAME = process.env.BUCKET_NAME;
// const IAM_USER_KEY = process.env.IAM_USER_KEY;
// const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

// const s3 = new aws.S3({
//   accessKeyId: IAM_USER_KEY,
//   secretAccessKey: IAM_USER_SECRET
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     acl: 'public-read-write',
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname })
//     },
//     key: function (req, file, cb) {
//       cb(null, `${req.user.username}/${Date.now().toString()}-${file.originalname}`)
//     }
//   })
// })

router.get('/', (req, res) => {
  res.json('crops');
});

// router.post('/', upload.array('photo', 6), (req, res) => {
router.post('/', (req, res) => {

  let id = req.user.id
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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return Crop
    .query({ where: { id } })
    .fetch({ withRelated: ['cropStatus', 'plant', 'photo'] })
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