var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");
var mid = require('../middleware');

// GET /google
router.get("/google", function(req, res, next) {
    return res.send('logging in with google');
  });

module.exports = router;