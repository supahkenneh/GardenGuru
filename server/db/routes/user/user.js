const router = require('express').Router();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const User = require('../../models/User');
const Crop = require('../../models/Crop');

router.get('/:id', (req, res) => {
  const id = req.params.id;

  return User
    .where({ id })
    .fetchAll({ withRelated: 'photos' })
    .then(user => {
      if (!user) {
        return res.send('User does not exist.');
      } else {
        return res.json(user);
      }
    })
    .catch(err => {
      console.log('error :', err);
    });
});

router.get('/:id/stand', (req, res) => {
  const id = req.params.id;

  return Crop
    .where({ owner_id: id, crop_statuses: 1 })
    .fetchAll({ withRelated: 'photo' })
    .then(crops => {
      if (crops.length < 1) {
        return res.send('Nothing but us chickens!');
      } else {
        return res.json(crops);
      }
    })
    .catch(err => {
      console.log('error :', err);
    })
});

router.put('/settings', (req, res) => {
  const username = req.user.username;
  const id = req.user.id;
  const {
    oldPass,
    newPass,
    city,
    state,
    bio,
    stand_name
  } = req.body;

  return User
    .where({ username, id })
    .fetchAll()
    .then(user => {
      bcrypt.compare(oldPass, user.models[0].attributes.password)
        .then(result => {
          if (!result) {
            res.send('Invalid password.');
          } else {
              bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(newPass, salt, (err, hashedPassword) => {
                  if (err) {
                    return res.status(500);
                  }
                  return User
                    .where({ username, id })
                    .save({
                      password: hashedPassword,
                      city,
                      state,
                      bio,
                      stand_name
                    }, 
                    {
                      patch: true
                    })
                    .then(user => {
                      res.json({ message: 'success' });
                    })
                })
              })
          };
        });
    })
    .catch(err => {
      console.log('error :', err);
    });
})

module.exports = router;