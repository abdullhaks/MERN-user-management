import express from 'express';
import { signup } from '../../Controller/UserController/authCtrl.js';

const router = express.Router();

router.post("/signup",signup);

export default router;