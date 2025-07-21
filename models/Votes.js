const mongoose = require('mongoose');
const { Schema } = mongoose;

const votesSchema = new Schema({
    slno: {
        type: Number,
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

const Votes = mongoose.model('Votes', votesSchema);
Votes.createIndexes();
module.exports = Votes;