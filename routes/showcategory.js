const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newCategory = await Category.create({
                    categorytype:req.body.categorytype,
                    description: req.body.description,
                    url: req.body.url
                });
                console.log("Success in adding Category:");
                res.send(newCategory);
            }   catch (error) {
                res.status(500).send({ error: 'Error while creating Category' });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    }
);
router.get('/show', async (req, res) => {
    try {
      const category = await Category.find({});
      res.status(200).json(category);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred in show category' });
    }
  });
module.exports = router;
