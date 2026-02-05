import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 

import registerRoute from "./routes/registerRoute.js";
import questionRoute from "./routes/questionRoute.js";

const app = express();
const port = process.env.PORT || 3000; 
app.use(cors({
    origin: "https://quiz-app-frontend-6feqt57ph-hbhkjs-projects.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));
app.use(express.json());


app.use("/register", registerRoute);
app.use("/questions", questionRoute);

mongoose.connect(process.env.MongoDB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB", error));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
