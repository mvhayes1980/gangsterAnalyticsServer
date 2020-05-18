const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log');               // imports use of Sequelize to interact with my log model
const validateSession = require('../middleware/validate-session');  // incorporates use of validateSession

router.get('/getall', validateSession, (req, res) => {              // here validateSession offered as parameter to get request, though the request
    Log.findAll({
      where: {
        owner: req.user.id
      }
    })                                                   // is declared as req but never read...only its headers are checked to make sure
    .then(log => res.status(200).json(log))                         // User is authorized. Here on line 8, if the request is successful, return log in json.
    .catch(err => res.status(500).json({                            // Otherwise, throw 500 to user and include jsonified error message in console
        error:err
    }))
})

router.post('/createlog', validateSession, (req, res) => {   // here validateSession used as parameter, checking to authorize if User is allowed access to the function
    const logFromRequest = {                                 // parameter called after it, which takes the user's log request and allows a key-value pairing for each
        firstName: req.body.firstName,                       // DataType in the log model to the data in the body of the request.
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        mainImage: req.body.mainImage,
        aliases: req.body.aliases,
        dateOfBirth: req.body.dateOfBirth,
        placeOfBirth: req.body.placeOfBirth,
        dateOfDeath: req.body.dateOfDeath,
        placeOfDeath: req.body.placeOfDeath,
        causeOfDeath: req.body.causeOfDeath,
        spouse: req.body.spouse,
        lover: req.body.lover,
        gangAffiliation: req.body.gangAffiliation,
        rank: req.body.rank,
        criminalFootprint: req.body.criminalFootprint,
        allegedCrimes: req.body.allegedCrimes,
        criminalCharges: req.body.criminalCharges,
        prisonTerms: req.body.prisonTerms,
        prisonNameAndLoc: req.body.prisonNameAndLoc,
        weaponsOfChoice: req.body.weaponsOfChoice,
        methodsOfChoice: req.body.methodsOfChoice,
        mugshotOne: req.body.mugshotOne,
        mugshotTwo: req.body.mugshotTwo,
        mugshotThree: req.body.mugshotThree,
        didYouKnow: req.body.didYouKnow,
        owner: req.user.id
    }
    console.log(logFromRequest)
    Log.create(logFromRequest)
    .then(log => res.status(200).json(log))
    .catch(err => res.json(req.errors))
})


router.get('/getone/:id', validateSession, (req, res) => {
    Log.findOne({ where: { id: req.params.id }})
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({ error: err}))
  })

router.put('/update/:id', validateSession, (req, res) => {
    Log.update(req.body, { where: { id: req.params.id, owner: req.user.id }})
      .then(log => res.status(200).json(log))
      .catch(err => res.json({
        error: err
 }))
})

router.delete('/delete/:id', validateSession, (req, res) => {
    Log.destroy({
      where:{
        id: req.params.id,
        owner: req.user.id
      }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({
      error: err
    }))
});

module.exports = router;