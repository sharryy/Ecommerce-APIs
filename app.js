const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const UserRoutes = require('./routes/UserRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.use("/user", UserRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;