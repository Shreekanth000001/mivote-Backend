const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newCandidate = await Candidate.create({
                    name: req.body.name,
                    description: req.body.description,
                    img: req.body.img,
                    categorytype: req.body.categorytype
                });
                console.log("Success in adding Candidate");
                res.send(newCandidate);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the Candidate." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

router.get('/show', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.json({ candidates });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred' });
  }
});


module.exports = router;
