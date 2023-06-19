import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import AdminAuth from "../middleware/AdminAuth.js";

router.post("/user", UserController.create);
router.post("/login", UserController.login);
router.post("/recover", UserController.recoverPassword);
router.post("/change", UserController.changePassword);

router.put("/user", AdminAuth, UserController.edit);
router.delete("/user:id", AdminAuth, UserController.remove);
router.get("/users", AdminAuth, UserController.index);
router.get("/user/:id", AdminAuth, UserController.findUser);


export default router;
