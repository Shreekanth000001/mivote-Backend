const express = require('express');
const router = express.Router();
const Votes = require('../models/Votes');
const Voter = require('../models/Voter');         // ← import your Voter model
const { body, validationResult } = require('express-validator');

router.post(
  '/',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { voterid, category, candidateid } = req.body;

    try {
      // 1. Create the vote
      const newVote = await Votes.create({
        voterid,
        category,
        candidateid,
      });

      // 2. Mark that this voter has voted in this category:
      //    dynamic field name based on category
      const field = `voted.${category}`;
      await Voter.findByIdAndUpdate(voterid, {
        $set: { [field]: true }
      });

      console.log("Success in adding vote and updating voter flag");
      res.status(201).send(newVote);

    } catch (error) {
      console.error("Error creating vote or updating voter:", error);
      res.status(500).send({
        message: error.message || "An unexpected error occurred while creating the vote."
      });
    }
  }
);

module.exports = router;
