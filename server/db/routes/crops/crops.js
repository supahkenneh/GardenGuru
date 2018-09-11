const router = require('express').Router();
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
  console.log('posting to crops');
  res.json('add a new crop')
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return Crop
  .query({where: {id}})
  .fetch({withRelated: ['owner', 'cropStatus', 'plant', 'photo', 'messages']})
  .then(crop=>{
    return res.json(crop)
  })
  .catch(err=>{
    console.log('err', err);
  })
});

router.delete('/:id', (req,res)=>{
  const id = req.params.id;
  return Crop
  .where({id})
  .fetch()
  .then(crop=>{
    let status = crop.attributes.crop_statuses;
    status = 3
    return Crop
    .where({id})
      .save({ crop_statuses: status}, {patch: true})
      .then(()=>{
        res.json({success: 'true'})
      })
      .catch(err=>{
        console.log('err.message', err.message);
      })
  })
})

router.put('/:id', (req, res) => {
  console.log('editing crop');
  res.json('edit specific crop');
});

module.exports = router;