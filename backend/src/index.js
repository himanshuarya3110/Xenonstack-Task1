import express from "express";
import dotenv from "dotenv";
import { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mainrouter } from "./routes/routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;  // Set default port
const DATABASE_URL = process.env.DATABASE_URL;

export const app = express();

// Enable CORS if needed
app.use(cors({
    origin: "http://127.0.0.1:5173",
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,OPTIONS",
    credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/v1", mainrouter);

if (!DATABASE_URL) {
    console.error("DATABASE_URL is undefined. Please check your .env file.");
    process.exit(1);  // Exit if the database URL is missing
}

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
