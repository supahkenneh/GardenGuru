const router = require('express').Router();
const Crop = require('../../models/Crop');

router.get('/', (req, res) => {
  
  if (!req.user) {
    return res.send('Please log in to see your garden.');
  } else {
    return Crop
      .where({ owner_id: req.user.id })
      .fetchAll({ withRelated: 'photo' })
      .then(response => {
        return res.json(response);
      })
      .catch(err => {
        console.log('error :', err);
      });
  }
});

module.exports = router;