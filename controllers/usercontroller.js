require('dotenv').config();
const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/create', (req, res) => {  
    console.log("Pre-creation");          // Here we have the controller linking up with the Model via the import on line 3.
    User.create({                         // take the post request at the '/create' endpoint and from the incoming post request,
        firstName: req.body.firstName,    // take User Model and insert value from User's request body for each key in Model.
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13) //  uses bcryptjs to salt the password 13 times and enter as value into password key.
   })
   .then(user => {
       console.log('User ID:', user.id);
       let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d'}); // then, taking the User object created above,
       res.status(200).json({                               // declare let token and at user.id assign jsonwebtoken to the id key created.
           userResponse: user,                              // Return 200 response and json in which user is actually created and, if client
           tokenResponse: token                             // requests are properly authorized && session current, make CRUD requests to server where token will
   })                                                       // be read in the headers of any request made to see if current and authorized
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