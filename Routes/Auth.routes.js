import { Router } from "express";
import { Login, Register, getCurrentUser } from "../Controllers/Auth.controllers.js";

const router = Router();

router.post("/login", Login)
router.post("/register", Register)
router.post("/get-Current-User", getCurrentUser)

export default router;