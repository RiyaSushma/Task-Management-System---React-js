const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('../database/db');
const authRoutes = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');

const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/task', taskRouter);

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})