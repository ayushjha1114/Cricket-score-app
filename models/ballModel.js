import mongoose from 'mongoose';

const ballSchema = new mongoose.Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    runsScored: { type: Number, required: true },
    strikerName: { type: String, required: true },
    nonStrikerName: { type: String, required: true },
    bowlerName: { type: String, required: true },
    isNoBall: { type: Boolean, default: false },
});

const Ball = mongoose.model('Ball', ballSchema);

export default Ball;