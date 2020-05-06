const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log');
const validateSession = require('../middleware/validate-session');

router.get('/getall', (req, res) => {
    Log.findAll()
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({
        error:err
    }))
})

router.post('/createlog', validateSession, (req, res) => {   
    const logFromRequest = {
        firstName: req.body.firstName,
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


router.get('/getone/:id', (req, res) => {
    Log.findOne({ where: { description: req.params.id }})
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({ error: err}))
  })

router.put('/update/:id', validateSession, (req, res) => {
    Log.update(req.body, { where: { id: req.params.id }})
      .then(log => res.status(200).json(log))
      .catch(err => res.json({
        error: err
 }))
})

router.delete('/delete/:id', validateSession, (req, res) => {
    Log.destroy({
      where:{
        id: req.params.id
      }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({
      error: err
    }))
});

module.exports = router;