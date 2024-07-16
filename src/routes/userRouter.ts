import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controller/userController";
import { userValidationRules, validate } from "../middleware/userValidation";

const router = express.Router();

router.get("/", getUsers);
router.post("/", userValidationRules(), validate, createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;