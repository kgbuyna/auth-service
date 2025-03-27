import { Router } from "express";

import { GetUserById, GetUsers } from "../controllers/userController";

const router = Router({ mergeParams: true });

router.get('/', GetUsers);
router.get('/:id', GetUserById);

export default router
