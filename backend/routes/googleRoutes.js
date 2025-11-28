import express from 'express';
import {
  login,
  oauth2callback,
  getContacts,
} from "../controllers/googleController.js";


const router = express.Router();

router.get("/google", login);

router.get("/oauth2callback", oauth2callback);
router.get("/contacts", getContacts);

export default router;