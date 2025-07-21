const express = require('express');
const router = express.Router();
const Voter = require('../models/Voter');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newVoter = await Voter.create({
                    name:req.body.name,
                    erp: req.body.erp,
                    gender: req.body.gender
                });
                console.log("Success in adding Voter:",req.body.name);
                res.send(newVoter);
            }   catch (error) {
                res.status(500).send({ error: 'Error while creating voter' });
            }

        } else {
            res.send({ errors: errors.array() });
        }
    }
)

router.get('/show', async (req, res) => {
    try {
      const voters = await Voter.find({});
      res.status(200).json(voters);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred in show voters' });
    }
  });

module.exports = router;