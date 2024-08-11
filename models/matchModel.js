import mongoose from 'mongoose';

const batsmanStatsSchema = new mongoose.Schema({
    name: String,
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
});

const bowlerStatsSchema = new mongoose.Schema({
    name: String,
    runsConceded: { type: Number, default: 0 },
    deliveries: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    economyRate: { type: Number, default: 0 },
});

const matchSchema = new mongoose.Schema({
    teamName: String,
    runs: { type: Number, default: 0 },
    ballsPlayed: { type: Number, default: 0 },
    batsmanStats: [batsmanStatsSchema],
    bowlerStats: [bowlerStatsSchema],
    currentRunRate: { type: Number, default: 0 },
    currentOver: { type: String, default: '0.0' },
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
