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
router.get('/messages', (req, res) => {
  if (!req.user) {
    return res.send('Please log in to proceed to your inbox.');
  } else {
    return Message
      .query({ where: { to: req.user.id }, orWhere: { from: req.user.id }})
      .fetchAll({ withRelated: ['to', 'from', 'crops'] })
      .then(response => {
        if (response.length < 1){
          return res.send('Nobody here but us chickens!')
        } else {
          return res.json(response);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };
});

// Gets all messages pertaining to a particular crop
router.get('/messages/:id', (req, res) => {
  const crop_id = req.params.id;
  if (!req.user) {
    return res.send('Please log in to proceed to your inbox.');
  } else {
    return Message
      .query({ 
        where: { crop_id, to: req.user.id },
        orWhere: { crop_id, from: req.user.id }
      })
      .fetchAll({ withRelated: ['to', 'from', 'crops'] })
      .then(response => {
        if (response.length < 1) {
          return res.send('Nobody here but us chickens!');
        } else {
          return res.json(response);
        };
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };
});

// Sends message regarding a specific crop; sellers cannot initiate a conversation
router.post('/:toId/messages/:cropId', (req, res) => {
  const userId = req.user.id;
  const cropId = req.params.cropId;
  const to = Number(req.params.toId); // for proper comparison
  
  const from = req.body.from;
  const seller_id = req.body.seller_id;
  const messageBody = req.body.content;
  
  let item;
  let err;

  return Crop
    .where({ id: cropId })
    .fetch()
    .then(crop => { // Crop validation check
      if (!crop) { 
        res.send('Item does not exist.')
      }
      item = crop.attributes.description.toLowerCase();
    })
    .then(() => { // Three-layer message-and-users validation check
      if (seller_id === from && seller_id !== to) {
        return Message
          .where({
            crop_id: cropId,
            to: seller_id,
            from: to
          })
          .fetch()
          .then(message => {
            if (!message) {
              return err = 'Seller is not allowed to initiate contact.';
            };
          });
      } else if (seller_id === from && seller_id === to) {
        return err = 'You cannot send a message to yourself!';
      } else if (userId !== from) {
        return err = 'You cannot send a message as someone else!';
      };
    })
    .then(response => {
      if (response) { // Stops here if "err" is defined
        return res.json({ message: response })
      } else {
        return User
          .where({ id: to })
          .fetch()
          .then(response => {
            // only works with Gmail, need to change domain
            const receiver = response.attributes.email;

            const data = {
              from: `GroBro <GroBro@mailinator.com>`,
              to: `${receiver}`,
              subject: `Someone is interested in buying your ${item}!`,
              text: `${messageBody}`
            };
            mailgun.messages().send(data, (error, body) => {
              if (error) { console.log(error); }
              console.log('Data :', data);
              console.log('Body :', body);
            });
            return new Message({
              to,
              from,
              seller_id,
              crop_id: cropId,
              content: messageBody
            })
              .save()
              .then(message => {
                res.json(message);
              });
          });
      };
    });
});

// Gets a user's profile
router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.user)
  return User
    .where({ id })
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

// Change password, location, bio, stand name
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
});

module.exports = router;