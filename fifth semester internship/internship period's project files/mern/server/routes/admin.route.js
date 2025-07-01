import { addProduct } from "../controllers/admin.controller.js";
import express from 'express';


const router = express.Router();


router.post('/update',addProduct);




export default router;