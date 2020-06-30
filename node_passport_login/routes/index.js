const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome page
router.get('/',(req,res) =>
    res.render('welcome') // view we want to render
);

// Dashboard page
router.get('/dashboard', ensureAuthenticated, (req,res) =>
    res.render('dashboard', {
        name : req.user.name
    }) // view we want to render
);

module.exports = router;