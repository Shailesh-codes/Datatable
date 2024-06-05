import express from "express";
import { getTasks, addTask, updateTask, deleteTask, uploadImage } from "../controller/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", uploadImage, addTask);
router.put("/:id", uploadImage, updateTask);
router.delete("/:id", deleteTask);

export default router;
