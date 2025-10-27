import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { dbConnect } from './config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middlewares/rateLimiter.js';
dotenv.config();
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

dbConnect()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})
})
.catch(()=>{
    console.log("Failed to connect DB");
})

app.get('/',(req, res)=>{
    res.send("something is here...")
})

app.use("/api/notes", notesRoutes)

