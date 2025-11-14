import express from "express";
import firebaseAuth from "../middleware/firebaseAuth.js";
import { firebaseLogin } from "../controllers/firebaseAuthController.js";

const router = express.Router();

// Must match frontend POST /api/auth/google
router.post("/google", firebaseAuth, firebaseLogin);

export default router;
