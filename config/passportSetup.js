const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys.js");
const User = require("../models/user.js");
const session = require('express-session');

passport.serializeUser(function(user, next){
    next(null, user.id);
});

passport.serializeUser(function(id, next){
    User.findById(id).then((user)=>done(null, user));    
});

passport.use(new GoogleStrategy({
    // options for strategy
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/auth/google/redirect"
},
    (accessToken, refreshToken, profile, done) => {
        // passport callback function

        // create object with google profile data
        var userData = {
            email: profile.id,
            name: profile.displayName,
            favoriteBook: "I am a Google User",
            password: "AsdfFDSA" + Math.floor((Math.random() * 99000))
        };

        // check if this user already exists
        User.findOne({ email: userData.email }).then(
            (currentUser) => {
                if (currentUser) {
                    // we already have the user in db
                    // todo redirect to profile id, pass an object with session data
                    done(currentUser, null);
                }
                else {
                    // we do not have this user yet in db
                    // use schema's `create` method to insert document into Mongo
                    User.create(userData, function (error, user) {
                        if (error) { console.dir(error); }
                        else {
                            console.dir(user);
                        }
                        done(null, user);
                        // if (error) {
                        //   return next(error);
                        // } else {
                        //   req.session.userId = user._id;
                        //   return res.redirect('/profile');
                        // }
                    });

                    
                }
            }
        );
        done();
    }
));
// Probably this is something like the acces token looks like
// ?code=4/AACm-8qxhH1obuYSb5XisPmd9qIWdu56lPwaDds5
// -p8dTqcnHGu3M7ewT
// -0IO30Jh7czfEtvbyL2oy84yMJchYA#