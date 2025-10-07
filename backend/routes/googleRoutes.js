import express from 'express';
import {
  login,
  oauth2callback,
  getContacts,
  checkAuth
} from "../controllers/googleController.js";


const router = express.Router();

router.get("/login", login);
router.get("/oauth2callback", oauth2callback);
router.get("/contacts", getContacts);
router.get("/check", checkAuth);

export default router;