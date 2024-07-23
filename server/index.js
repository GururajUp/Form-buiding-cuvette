const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require("cors");


const PORT = 3000;

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

const userRouter=require("./routes/userRoute")
app.use("/user",userRouter)
const folderRouter=require("./routes/folderRoute")
app.use("/folder",folderRouter)
const formRouter=require("./routes/formRoute")
app.use("/form",formRouter)



app.get('/health', (req, res) => {
    // res.send
    res.json({
        message: 'Formbot listing API is working fine',
        status: 'Working',
        date: new Date().toLocaleDateString()
    });
});

// REDIRECT PAGE TO 404
app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});
//localhost:3000/healt


app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});