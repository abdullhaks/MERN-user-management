import express from 'express';
import {testing} from '../Controller/UserController/test.js'

const router = express.Router();



router.get('/', testing);


export default router; 