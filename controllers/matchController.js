import Match from "../models/matchModel.js";
import Ball from "../models/ballModel.js";

// Helper function to calculate strike rate and economy rate
const calculateStats = (match) => {
  match.batsmanStats.forEach((batsman) => {
    batsman.strikeRate = (batsman.runs / batsman.ballsFaced) * 100;
  });

  match.bowlerStats.forEach((bowler) => {
    bowler.economyRate = bowler.runsConceded / (bowler.deliveries / 6);
  });

  match.currentRunRate = match.runs / (match.ballsPlayed / 6);
  const overs = Math.floor(match.ballsPlayed / 6);
  const balls = match.ballsPlayed % 6;
  match.currentOver = `${overs}.${balls}`;
};

// Add Ball Data
const addBallData = async (req, res) => {
  try {
    const {
      matchId,
      runsScored,
      strikerName,
      nonStrikerName,
      bowlerName,
      isNoBall,
    } = req.body;

    const match = await Match.findById(matchId);
    console.warn("🚀 ~ addBallData ~ match:", match);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const ball = new Ball({
      matchId,
      runsScored,
      strikerName,
      nonStrikerName,
      bowlerName,
      isNoBall,
    });
    await ball.save();

    match.runs += runsScored;

    if (!isNoBall) match.ballsPlayed += 1;

    const striker = match.batsmanStats.find((b) => b.name === strikerName) || {
      name: strikerName,
      runs: 0,
      ballsFaced: 0,
    };
    striker.runs += runsScored;
    striker.ballsFaced += 1;

    if (!match.batsmanStats.find((b) => b.name === strikerName))
      match.batsmanStats.push(striker);

    const bowler = match.bowlerStats.find((b) => b.name === bowlerName) || {
      name: bowlerName,
      runsConceded: 0,
      deliveries: 0,
      noBalls: 0,
    };
    bowler.runsConceded += runsScored;
    bowler.deliveries += 1;
    if (isNoBall) bowler.noBalls += 1;

    if (!match.bowlerStats.find((b) => b.name === bowlerName))
      match.bowlerStats.push(bowler);

    calculateStats(match);
    await match.save();

    res.status(201).json({ message: "Ball data added successfully", match });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit Ball Data
const editBallData = async (req, res) => {
  try {
    const {
      ballId,
      runsScored,
      strikerName,
      nonStrikerName,
      bowlerName,
      isNoBall,
    } = req.body;

    const ball = await Ball.findById(ballId);
    console.warn("🚀 ~ editBallData ~ ball:", ball);
    if (!ball) return res.status(404).json({ message: "Ball data not found" });

    const match = await Match.findById(ball.matchId);
    console.warn("🚀 ~ editBallData ~ match:", match);
    if (!match) return res.status(404).json({ message: "Match not found" });

    // Reverse previous stats
    match.runs -= ball.runsScored;
    match.ballsPlayed -= 1;

    const oldStriker = match.batsmanStats.find(
      (b) => b.name === ball.strikerName
    );
    console.warn("🚀 ~ editBallData ~ oldStriker:", oldStriker);
    if (oldStriker) {
      oldStriker.runs -= ball.runsScored;
      oldStriker.ballsFaced -= 1;
    }

    const oldBowler = match.bowlerStats.find((b) => b.name === ball.bowlerName);
    console.warn("🚀 ~ editBallData ~ oldBowler:", oldBowler);
    if (oldBowler) {
      oldBowler.runsConceded -= ball.runsScored;
      oldBowler.deliveries -= 1;
      if (ball.isNoBall) oldBowler.noBalls -= 1;
    }

    // Apply new stats
    ball.runsScored = runsScored;
    ball.strikerName = strikerName;
    ball.nonStrikerName = nonStrikerName;
    ball.bowlerName = bowlerName;
    ball.isNoBall = isNoBall;
    await ball.save();

    match.runs += runsScored;
    match.ballsPlayed += 1;

    const newStriker = match.batsmanStats.find(
      (b) => b.name === strikerName
    ) || { name: strikerName, runs: 0, ballsFaced: 0 };
    console.warn("🚀 ~ editBallData ~ newStriker:", newStriker);
    newStriker.runs += runsScored;
    newStriker.ballsFaced += 1;

    if (!match.batsmanStats.find((b) => b.name === strikerName))
      match.batsmanStats.push(newStriker);

    const newBowler = match.bowlerStats.find((b) => b.name === bowlerName) || {
      name: bowlerName,
      runsConceded: 0,
      deliveries: 0,
      noBalls: 0,
    };
    console.warn("🚀 ~ newBowler ~ newBowler:", newBowler);
    newBowler.runsConceded += runsScored;
    newBowler.deliveries += 1;
    if (isNoBall) newBowler.noBalls += 1;

    if (!match.bowlerStats.find((b) => b.name === bowlerName))
      match.bowlerStats.push(newBowler);

    calculateStats(match);
    await match.save();

    res.status(200).json({ message: "Ball data edited successfully", match });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Match Details
const getAllDetails = async (req, res) => {
  try {
    const matchId = req.params.matchId;
    console.warn("🚀 ~ getAllDetails ~ matchId:", matchId);

    //   const match = await Match.findById(matchId, {_id: 0});
    const match = await Match.findById(matchId)
      .populate("batsmanStats")
      .populate("bowlerStats")
      .exec();
    console.warn("🚀 ~ getAllDetails ~ match:", match);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addBallData, editBallData, getAllDetails };
