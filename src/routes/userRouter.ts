import express from "express";
import { createUser, getUsers, getUser } from "../controller/userController";
import { userValidationRules, validate } from "../middleware/userValidation";

const router = express.Router();

router.get("/", getUsers);
router.post("/", userValidationRules(), validate, createUser);
router.get("/:id", getUser);

export default router;