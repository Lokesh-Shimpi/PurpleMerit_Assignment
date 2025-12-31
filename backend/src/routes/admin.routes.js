import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../controllers/admin.controller.js";

const router = Router();

/**
 * ADMIN-ONLY ROUTES
 */
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.patch("/users/:id/activate", authMiddleware, roleMiddleware("admin"), activateUser);
router.patch("/users/:id/deactivate", authMiddleware, roleMiddleware("admin"), deactivateUser);

export default router;
