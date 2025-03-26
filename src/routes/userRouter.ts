import { Router } from "express";

import { GetUsers } from "../controllers/userController";

const router = Router({ mergeParams: true });

router.get('/', GetUsers)

export default router
