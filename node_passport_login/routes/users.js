const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

//Login Page
router.get('/login',(req,res) => {
    res.render('login');
});

//Register Page
router.get('/register',(req,res) => {
    res.render('register');
});

//Register Handle
router.post('/register',(req,res) => {
   const { name, email, password, password2 } = req.body;

   let errors = [];

   //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg : 'Please fill in all fields' });
    }

    //check passwords match
    if(password !== password2) {
        errors.push({ msg : 'Passwords do not match' });
    }

    //check pass length
    if(password.length < 6){
        errors.push({ msg : 'Password should be atleast 6 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
       //Validation passed
        User.findOne({ email : email })
           .then(user => {
               if(user) {
                   //User exists
                   errors.push({ msg : 'Email is already registered' });
                   res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
               } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                   // Hash password (generate a salt so that we can create a hash)
                   // 10 is salt rounds
                   bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err;

                            //set password to hashed
                            newUser.password = hash;

                            //Save User
                            newUser.save()
                             .then(user => {
                                 res.redirect('/users/login');
                             })
                             .catch(err => console.log(err))
                  }))
               }
           });
    }
});

module.exports = router;