import { Router } from "express";

import { LoginSchema } from "../schema/loginSchema";
import RegisterSchema from "../schema/registerSchema";

import { Login, Register } from "../controllers/authController";

import { validator } from "../middleware/validator";

const router = Router({ mergeParams: true });

router.post('/login', validator(LoginSchema), Login);
router.post('/register', validator(RegisterSchema), Register);

export default router
