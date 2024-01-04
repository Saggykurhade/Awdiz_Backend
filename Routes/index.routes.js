import { Router } from "express";
import authRoutes from './Auth.routes.js';
import productRoutes from './Products.routes.js';
import userRoutes from './User.routes.js';

const router = Router();


router.use("/auth", authRoutes)
router.use("/product", productRoutes)
router.use("/user", userRoutes)


export default router;