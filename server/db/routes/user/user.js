const router = require('express').Router();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const User = require('../../models/User');
const Crop = require('../../models/Crop');
const Message = require('../../models/Message');

const botEmail = process.env.BOT_EMAIL;
const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

// ===== ROUTES ===== //

// Gets all messages in inbox
router.get('/', (req, res) => {
  return User.where({ city: req.user.city })
    .orderBy('updated_at', 'DESC')
    .fetchAll({ columns: ['stand_name', 'username', 'avatar_link'] })
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      console.log('error :', err);
    });
});

router.get('/messages', (req, res) => {
  if (!req.user) {
    return res.send('Please log in to proceed to your inbox.');
  } else {
    return Message.query({
      where: { to: req.user.id },
      orWhere: { from: req.user.id }
    })
      .fetchAll({ withRelated: ['to', 'from'] })
      .then(response => {
        if (!response) {
          return res.send('Nobody here but us chickens!');
        } else {
          return res.json(response);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }
});

router.post('/messages/:id', (req, res) => {
  const initiatorId = req.user.id;
  const to = Number(req.params.id); // for proper comparison
  const messageBody = req.body.content;
  let err;

  return new Message({
    from: initiatorId,
    to: to,
    content: messageBody
  })
    .save()
    .then(message => {
      return User.where({ id: to })
        .fetch()
        .then(user => {
          const toEmail = user.attributes.email;

          const data = {
            from: `GroBro <${botEmail}>`,
            to: `${toEmail}`,
            subject: `${req.user.username} is trying to reach you!`,
            text: `${messageBody}`
          };
          mailgun.messages().send(data, (error, body) => {
            if (error) {
              console.log(error);
            }
          });
          res.json(message);
        });
    });
});



router.get('/conversations', (req, res) => {
  return Message.query(function(qb) {
    qb.where('from', '!=', req.user.id).distinct('from');
  })
    .fetchAll(
      { withRelated: ['from'], columns: ['content'] }
      )
    .then(result => {
      return res.json(result);
    });
});



router.get('/conversations/:id', (req, res) => {
  const me = req.user.id;
  const they = req.params.id;
  return Message.query({
    where: { from: they, to: me },
    orWhere: { from: me, to: they }
  })
    .fetchAll({ withRelated: ['to', 'from'] })
    .then(result => {
      res.json(result);
    });
});

// Sends message regarding a specific crop; sellers cannot initiate a conversation

// Gets a user's profile
router.get('/:id', (req, res) => {
  const id = req.params.id;
  return User.where({ id })
    .fetch()
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

// Gets a user's stand
router.get('/:id/stand', (req, res) => {
  const id = req.params.id;
  return Crop.where({ owner_id: id, selling: true })
    .fetchAll({
      withRelated: ['owner', 'cropStatus', 'plant', 'photo']
    })
    .then(crops => {
      if (crops.length < 1) {
        return res.send('Nothing but us chickens!');
      } else {
        return res.json(crops);
      }
    })
    .catch(err => {
      console.log('error :', err);
    });
});

router.put('/addStand', (req, res) => {
  const { stand_name } = req.body;
  const id = req.user.id;
  return new User({ id })
    .save({ stand_name }, { patch: true })
    .then(user => {
      return user.refresh()
    })
    .then(user => {
      let userProfile = {
        id: user.attributes.id,
        stand_name: user.attributes.stand_name,
        username: user.attributes.username,
        email: user.attributes.email,
        first_name: user.attributes.first_name,
        last_name: user.attributes.last_name,
        rating: user.attributes.rating,
        bio: user.attributes.bio,
        city: user.attributes.city,
        state: user.attributes.state,
        avatar_link: user.attributes.avatar_link
      }
      return res.json(userProfile);
    })
    .catch(err => {
      console.log('err.message', err.message);
    });
});

// Change password, location, bio, stand name
router.put('/settings', (req, res) => {
  const username = req.user.username;
  const id = req.user.id;
  const { oldPass, newPass, city, state, bio, stand_name } = req.body;

  return User.where({ username, id })
    .fetchAll()
    .then(user => {
      bcrypt
        .compare(oldPass, user.models[0].attributes.password)
        .then(result => {
          if (!result) {
            res.send('Invalid password.');
          } else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
              bcrypt.hash(newPass, salt, (err, hashedPassword) => {
                if (err) {
                  return res.status(500);
                }
                return User.where({ username, id })
                  .save(
                    {
                      password: hashedPassword,
                      city,
                      state,
                      bio,
                      stand_name
                    },
                    {
                      patch: true
                    }
                  )
                  .then(user => {
                    res.json({ message: 'success' });
                  });
              });
            });
          }
        });
    })
    .catch(err => {
      console.log('error :', err);
    });
});

module.exports = router;
