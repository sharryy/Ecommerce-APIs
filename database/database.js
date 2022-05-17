const mongoose = require("mongoose");
require("dotenv").config();

const database = mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (!error) {
            console.log("Connected to the mongoDB");
        } else {
            console.log("Connection to MongoDB failed \n" + error);
        }
    }
);

module.exports = database;
