const dotenv = require("dotenv");
const express = require("express");

const app = express();
dotenv.config({ path: './.env' })

// It's used to convert json data in to object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/route")(app)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});