const {connect} = require("mongoose");
require("dotenv").config();

const database = connect(
    process.env.DATABASE_URL_LIVE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (!error) {
            console.log("Connected to the MongoDB");
        } else {
            console.log("Connection to MongoDB failed \n" + error);
        }
    }
);

module.exports = database;
