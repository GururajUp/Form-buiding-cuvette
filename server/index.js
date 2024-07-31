const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require("cors");
const path = require("path")


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// const corsOptions = {
//     origin: 'http://localhost:5173', 
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));


// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => {console.log('Connected to MongoDB')})
.catch(err => {console.log('Failed to connect to MongoDB', err)});

const userRouter=require("./routes/userRoute")
app.use("/user",userRouter)
const folderRouter=require("./routes/folderRoute")
app.use("/folder",folderRouter)
const formRouter=require("./routes/formRoute")
app.use("/form",formRouter)
const responseRouter = require("./routes/responseRoute")
app.use("/responses", responseRouter);



app.get('/health', (req, res) => {
    // res.send
    res.json({
        message: 'Formbot  API is working fine',
        status: 'Working fine',
        date: new Date().toLocaleDateString()
    });
});

// REDIRECT PAGE TO 404
app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Error loading page',
        status: 'Error',
    });
});
//localhost:3000/healt


app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});