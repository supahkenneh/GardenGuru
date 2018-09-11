const router = require('express').Router();
const Crop = require('../../models/Crop');

router.get('/', (req, res) => {
  const id = req.user.id;
  return Crop
    .where({ owner_id: id })
    .fetchAll({ withRelated: 'photo' })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log('error :', err);
    });
});

module.exports = router;