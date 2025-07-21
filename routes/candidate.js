const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { body, validationResult } = require('express-validator');

router.get('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newCandidate = await Candidate.create({
                    name: req.body.name,
                    description: req.body.description,
                    img: req.body.img,
                    category: req.body.category
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

module.exports = router;