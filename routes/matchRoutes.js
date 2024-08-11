import express from "express";
import { addBallData, editBallData, getAllDetails } from '../controllers/matchController.js';

const router = express.Router();

router.post('/add', addBallData);
router.put('/edit', editBallData);
router.get('/details/:matchId', getAllDetails);

export default router;