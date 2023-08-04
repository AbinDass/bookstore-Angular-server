import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import userRouter from "./routes/userRoutes.js";
dotenv.config({ path: "./.env" });
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "https://64ccccbfda73a576c56af3ef--bespoke-axolotl-ce82bc.netlify.app/",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions), json());

const DB = process.env.DATABASE;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`databse connected successfully `);
    });
app.use("/api", userRouter)
// app.use("/api/createsignup", (req, res) => {
//     console.log(req.body);
// });

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`running on port ${process.env.PORT}`);
    }
});
