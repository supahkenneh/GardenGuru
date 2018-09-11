const router = require('express').Router();
const Crop = require('../../models/Crop');

router.get('/', (req, res) => {
  return Crop
    .query(qb => {
      qb.innerJoin('users', 'crops.owner_id', 'users.id');
      qb.orderBy('state', 'ASC')
    })
    .fetchAll({ withRelated: 'owner' })
    .then(response => {
      return res.json(response)
    })
    .catch(err => {
      console.log('error :', err);
    });
});

module.exports = router;