import "dotenv/config";
const port = process.env.port || 3000;
import mongoose from "mongoose";
import express from "express";
const app = express();
import registerRoute from "./routes/registerRoute.js";
import questionRoute from "./routes/questionRoute.js";
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})
mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connecting to MongoDB", error)

})

app.use(express.json())
app.use("/register", registerRoute)
app.use("/questions", questionRoute)

