import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// REGISTER
router.post("/register", (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) return res.status(500).send("Error interno");
    if (!user) {
      return res.status(400).send(info?.message || "Error en registro");
    }
    res.send({ status: "success", message: "Usuario creado" });
  })(req, res, next);
});

// LOGIN
router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);

    res.cookie("token", token, { httpOnly: true });

    res.send({ status: "success", token });
  },
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send({ status: "success", message: "Sesión cerrada" });
});

// CURRENT
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ status: "success", user: req.user });
  },
);

export default router;
