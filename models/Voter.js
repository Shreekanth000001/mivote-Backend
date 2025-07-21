const mongoose = require('mongoose');
const { Schema } = mongoose;

const voterSchema = new Schema({
  slno: {
    type: Number,
    unique: true // Ensure slno is unique
  },
  name: {
    type: String,
    required: true
  },
  erp: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  },
  voted: {
    President: { type: Boolean, default: false },
    VicePresident: { type: Boolean, default: false },
    Secretary: { type: Boolean, default: false }
  },
  doj: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to auto-increment slno
voterSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Find the highest slno in the Voter collection
      const lastVoter = await this.constructor.findOne().sort({ slno: -1 }).select('slno');
      this.slno = lastVoter && lastVoter.slno ? lastVoter.slno + 1 : 1;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Voter = mongoose.model('Voter', voterSchema);
Voter.createIndexes();

module.exports = Voter;