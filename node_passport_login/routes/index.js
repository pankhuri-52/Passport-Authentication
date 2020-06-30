const express = require('express');
const router = express.Router();

// Welcome page
router.get('/',(req,res) =>
    res.render('welcome') // view we want to render
);

// Dashboard page
router.get('/dashboard',(req,res) =>
    res.render('dashboard') // view we want to render
);

module.exports = router;