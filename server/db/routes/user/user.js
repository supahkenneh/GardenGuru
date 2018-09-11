const router = require('express').Router();
const User = require('../../models/User');

router.get('/:id', (req, res) => {
  const id = req.params.id;

  return User
    .where({ id })
    .fetchAll({ withRelated: 'photos' })
    .then(user => {
      if (!user) {
        return res.send( 'User does not exist.' );
      } else {
        return res.json(user);
      }
    })
    .catch(err => {
      console.log('error :', err);
    });
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