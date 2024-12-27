import express from 'express';
import {updateProfile} from '../../Controller/UserController/profileCtrl.js'
import { verifyToken } from '../../Utils/verifyuser.js';

const router = express.Router();


router.put("/update",verifyToken,updateProfile); 



export default router; 