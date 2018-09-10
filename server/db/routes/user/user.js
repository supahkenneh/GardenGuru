const router = require('express').Router();

router.get('/:id', (req, res) => {
  console.log('get user profile');
  res.json('user profile');
});

router.get('/:id/stand', (req, res) => {
  console.log(`a user's stand`)
  res.json('user stand');
});

router.put('/settings', (req, res) => {
  console.log('change user settings')
  res.json('change user settings');
});

module.exports = router;