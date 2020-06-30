const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose'); // for checking into the database
const bcrypt = require('bcryptjs'); // for checking the hash password

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField : 'email'}, (email, password, done) => {
            // Match User
            User.findOne({email : email})
             .then(user => {
                if(!user) {
                    return done(null , false, {message : 'That email is not registered'}); 
                    // null for error, false for user, message in options
                }

                //Match password
                bcrypt.compare(password, user.password, (err, isMatch)=> {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, { message : 'Password incorrect'});
                    }
                })

             })
             .catch(err => console.log(err));
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}