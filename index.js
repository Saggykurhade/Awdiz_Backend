import express, { json } from 'express';
import router from './Routes/index.routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

app.use((req,res,next) =>{
    console.log("hi from middleware use")
    // res.send("hi  from middleware use")
    next();
})

app.get("/", function(req, res) {
    res.send("Hello Sagar")
})

app.use("/api/v1", router)
mongoose.connect(process.env.MONGOURL).then(() => console.log('Database Connected...'))

//or

// mongoose.connect('mongodb+srv://kurhade4511:hG5fl7B7B2zuQRtj@cluster0.ye9enkk.mongodb.net/awdiz4').then(() => console.log('database connected!'))

app.listen(8000, () => console.log("App is running on port 8000"))