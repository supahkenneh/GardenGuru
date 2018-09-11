const router = require('express').Router();
const Plant = require('../../models/Plant');

router.get('/', (req, res) => {
  console.log('show garden');
  res.json(`show user's garden`)
});

router.get('/plants', (req, res) => {
  return Plant
    .fetchAll()
    .then(plants => {
      res.json(plants);
    })
})

module.exports = router;