const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", UserRoutes);

app.use("/category", CategoryRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;