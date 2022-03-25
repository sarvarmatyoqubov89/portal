const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./rotes');


const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.get('/', (req, res) => {
    res.status(200).send('Hello')
});

app.use('/api', router)


app.listen(process.env.PORT, () => console.log(`Server started on: ${process.env.PORT}`));