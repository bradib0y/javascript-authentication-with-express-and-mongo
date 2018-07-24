const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys.js");

passport.use(new GoogleStrategy({
    // options for strategy
    clientID: keys.clientID,
    clientSecret: keys.clientSecret
    },
    ()=>{
        // passport callback function
    }
));