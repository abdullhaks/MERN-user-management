import express from 'express';
import { signup , signin, google, signOut, deleteAccount } from '../../Controller/UserController/authCtrl.js';

const router = express.Router();

router.post("/signup",signup);
router.post('/signin',signin);
router.post('/google',google);
router.post("/sign-out", signOut);
router.post("/delete-account", deleteAccount);

export default router;