import { signup,signin,signout } from "../controllers/auth.controller.js";
import express from 'express';

const router = express.Router();


router.post('/signup',signup);


router.post('/signin',signin);

router.get('/signout',signout);


export default router;