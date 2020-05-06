require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Token:', token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(!err && decoded){
            User.findOne({
                where:{
                    id:decoded.id
                }
            })
            .then(user => {
                if(!user) throw 'err';       // if user not found, throw error
                req.user = user;             // set request user to user...give matching point of ref as to where it should be and where it isn't....
                return next();           // this breaks us out of the process, we will not call the callback function a second time
            })
            .catch(err => next(err))
        } else {
            req.errors = err;
            console.log(err);
            return res.status(401).send('Not Authorized')
        }
    })

}

module.exports = validateSession;