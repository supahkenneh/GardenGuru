const express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const router = express.Router();
const app = express();
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);


router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: 'user_location' })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // res.redirect('/marketprlace');
    console.log('success')
  }
);
module.exports = router;
