import { File } from "buffer";
import Taskmodel from "../models/Taskmodel.js";
import multer from "multer";
import path from "path";
import { error } from "console";


// Set up multer for file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage })

export const getTasks = async (req, res) => {
    try {
        const tasks = await Taskmodel.find();
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({
            title,
            description,
            image: req.file ? req.file.filename : ""
        });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const task = await Taskmodel.findById(id);

        if (req.file) {
            task.image = req.file.filename;
        }

        task.title = title;
        task.description = description;

        await task.save();
        res.json(task)
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Taskmodel.findByIdAndDelete(id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const uploadImage = upload.single("image");

