var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");
var mid = require('../middleware');
const passport = require("passport");
const passportSetup = require("../config/passportSetup.js");

// GET /google
router.get("/google", passport.authenticate("google",
  {scope: ['profile']})
);

// Callback route for google auth
router.get("/google/redirect", passport.authenticate('google'), (req, res)=>{
  res.send("you reached the callback URI");
}
);

module.exports = router;