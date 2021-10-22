const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './.env' });
require('./db/connection')

// It's used to convert json data in to object
app.use(express.json())

app.use(require('./router/routers'))
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})