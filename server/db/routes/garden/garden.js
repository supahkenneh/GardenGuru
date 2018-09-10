const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('show garden');
  res.json(`show user's garden`)
});

module.exports = router;