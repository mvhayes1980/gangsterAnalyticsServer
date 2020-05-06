require('dotenv').config();
const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/create', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
   })
   .then(user => {
       let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d'});
       res.status(200).json({
           userResponse: user,
           tokenResponse: token
   })
})
    .catch(err => res.status(500).json({ error: err }))

});
// USER LOGIN

router.post('/login', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, function(err, matches){
                if(matches){
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d'});
                    res.status(200).json({
                        userResponse: user,
                        tokenResponse: token
                    });
                } else {
                    res.status(401).json({ error: 'Username or password did not match'})
                }
            })
        } else {
            res.status(402).json({ error: 'No user found'})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;