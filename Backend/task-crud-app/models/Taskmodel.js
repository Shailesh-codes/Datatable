import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

export default mongoose.model("Taskmodel", taskSchema);