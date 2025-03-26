import { Router } from "express";

import LoginSchema from "src/schema/loginSchema";
import RegisterSchema from "src/schema/registerSchema";

import { Login, Register } from "src/controllers/authController";

import { validator } from "../middleware/validator";

const router = Router({ mergeParams: true });

router.post('/login', validator(LoginSchema), Login);
router.post('/register', validator(RegisterSchema), Register);

export default router
