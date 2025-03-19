import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

import { app } from "./app.js";
import { connectDB } from "./connectDB/db.js";

connectDB()

app.listen(process.env.PORT || 2000,()=>{
    console.log(`app is listening on ${process.env.PORT}`)
})