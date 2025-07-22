const express = require('express');
const router = express.Router();
const Votes = require('../models/Votes');
const Voter = require('../models/Voter');
const { validationResult } = require('express-validator');

router.post(
  '/',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { voterid, president, vicePresident, secretary } = req.body;

    // Basic validation to ensure all parts of the ballot are present
    if (!voterid || !president || !vicePresident || !secretary) {
        return res.status(400).json({ message: "Incomplete ballot. Please select a candidate for each position." });
    }

    try {
      // Check if the voter has already voted
      const voter = await Voter.findById(voterid);
      if (!voter) {
        return res.status(404).json({ message: "Voter not found." });
      }
      if (voter.voted) {
        return res.status(403).json({ message: "This voter has already cast their ballot." });
      }

      // Prepare the vote documents for each position
      const votesToCreate = [
        { voterid, candidateid: president, category: 'President' },
        { voterid, candidateid: vicePresident, category: 'VicePresident' },
        { voterid, candidateid: secretary, category: 'Secretary' },
      ];

      // Insert all votes into the database
      await Votes.insertMany(votesToCreate);

      // After successfully saving the votes, update the voter's status
      voter.voted = true;
      await voter.save();

      console.log(`Ballot successfully cast for voter: ${voterid}`);
      res.status(201).json({ message: "Vote submitted successfully!" });

    } catch (error) {
      console.error("Error submitting ballot:", error);
      res.status(500).send({
        message: "An unexpected error occurred while submitting the ballot."
      });
    }
  }
);

router.get('/show', async (req, res) => {
    try {
      const votes = await Votes.find({});
      res.status(200).json(votes);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred in show votes' });
    }
  });

module.exports = router;
