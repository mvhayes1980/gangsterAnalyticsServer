require('dotenv').config();                 // require .env bc of process.env.JWT_SECRET
const jwt = require('jsonwebtoken');       //   allows .verify on line 8 to check the 'jsonwebtoken' and either decode or throw err
const User = require('../db').import('../models/user'); // require db access to user model and creates const User
                                                    //
const validateSession = (req, res, next) => {       //  parameters for validateSession function are req (request), res (response), and next
    const token = req.headers.authorization;        //  creates const token from the Authorization header of the request
    console.log('Token:', token)                    //  logs token to console
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{ // uses 'jsonwebtoken' verify method to take the token, check the .env for access
        if(!err && decoded){        // and then pass in two parameters, err and decoded. This if statement states, if there's no cause for err (due to
            User.findOne({          // the calling of process.env.JWT_SECRET, AND ALSO the token is decoded, find the User associated with token by
                where:{             // the id using the decoded.id provided
                    id:decoded.id      //
                }                       //
            })
            .then(user => {
                if(!user) throw 'err';       // if user not found, throw error
                req.user = user;             // set request user to user...give matching point of ref as to where it should be and where it isn't....
                return next();           // this breaks us out of the process, we will not call the callback function a second time
            })
            .catch(err => next(err))    // otherwise, this provides err and breaks us out of the process
        } else {
            req.errors = err;           // errors from the request are equal to the
            console.log(err);           // message we log to the console for debugging purposes
            return res.status(401).send('Not Authorized')   // return a 401 to User stating not permitted access
        }
    })

}

module.exports = validateSession;       // export validateSession to be included in parameters of all CRUD requests to server
                                        // and have an interface with the middleware to do its job