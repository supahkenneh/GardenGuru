const router = require('express').Router();
const Crop = require('../../models/Crop');

router.get('/', (req, res) => {
  console.log('getting crops in marketplace');
  res.json('crops in marketplace');
});

module.exports = router;