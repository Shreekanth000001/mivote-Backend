const mongoose = require('mongoose');
const { Schema } = mongoose;

const votesSchema = new Schema({
    slno: {
        type: Number,
        unique: true // Ensure slno is unique
    },
    voterid: {
        type: Schema.Types.ObjectId,
        ref: 'Voter',
        required: true,
        validate: {
            validator: function (voterid) {
                return !!this.model('Voter').findById(voterid);
            },
            message: props => `${props.value} is not a valid voterid`
        }
    },
    category: {
        type: String
    },
    candidateid: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
        validate: {
            validator: function (candidateid) {
                return !!this.model('Candidate').findById(candidateid);
            },
            message: props => `${props.value} is not a valid candidateid`
        }
    },
    doi: { type: Date, default: Date.now },
});

votesSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            // Find the highest slno in the Votes collection
            const lastVotes = await this.constructor.findOne().sort({ slno: -1 }).select('slno');
            this.slno = lastVotes && lastVotes.slno ? lastVotes.slno + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});
const Votes = mongoose.model('Votes', votesSchema);
Votes.createIndexes();
module.exports = Votes;