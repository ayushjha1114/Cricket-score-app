import mongoose from "mongoose";
import dotenv from "dotenv";
import Match from "./models/matchModel.js";
import Ball from "./models/ballModel.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Create sample match data
    const match = new Match({
      teamName: "Team A",
      runs: 40,
      ballsPlayed: 20,
      batsmanStats: [
        { name: "Player 1", runs: 20, ballsFaced: 10, strikeRate: 200 },
        { name: "Player 2", runs: 16, ballsFaced: 8, strikeRate: 200 },
      ],
      bowlerStats: [
        {
          name: "Bowler 1",
          runsConceded: 40,
          deliveries: 10,
          noBalls: 1,
          economyRate: 4.0,
        },
      ],
      currentRunRate: 6.0,
      currentOver: "3.2",
    });

    await match.save();
    console.log("Sample match data added");

    const balls = [
      {
        runsScored: 4,
        strikerName: "Player 1",
        nonStrikerName: "Player 2",
        bowlerName: "Bowler 1",
        isNoBall: false,
        matchId: match._id,
      },
      {
        runsScored: 1,
        strikerName: "Player 2",
        nonStrikerName: "Player 1",
        bowlerName: "Bowler 1",
        isNoBall: false,
        matchId: match._id,
      },
    ];

    await Ball.insertMany(balls);
    console.log("Sample ball data added");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder();
