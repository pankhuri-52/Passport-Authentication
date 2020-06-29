const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>
    res.render('welcome') // view we want to render
);

module.exports = router;