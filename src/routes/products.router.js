import { Router } from "express";
import passport from "passport";
import { authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize(["user"]),
  (req, res) => {
    res.send("Productos protegidos");
  },
);

export default router;
