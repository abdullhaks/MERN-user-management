import express from 'express';
import {updateProfile} from '../../Controller/UserController/profileCtrl.js'

const router = express.Router();


router.put("/update",updateProfile); // Assuming `verifyToken` middleware validates the JWT



export default router; 