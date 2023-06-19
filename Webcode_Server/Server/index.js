import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import userRoutes from './Routes/users.js';
import questionRoutes from './Routes/questions.js';
import answerRoutes from './Routes/answers.js';
import otpRoutes from './Routes/otp.js';
import connectDB from './Config/connectDB.js';


dotenv.config()
connectDB();
const port = 8000

const app = express()


app.use(cors({
    origin: true,
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use('/otp', otpRoutes)

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

