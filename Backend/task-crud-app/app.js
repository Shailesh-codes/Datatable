import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import morgan from 'morgan';
import colors from "colors"
import taskRoutes from "./routes/taskRoutes.js"

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 7070

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})


app.get("/", (req, res) => {
    res.send("<h1>Here's is the Datatable where you can Create, Read, Update, Delete</h1>")
});