const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", UserRoutes);

app.use("/category", CategoryRoutes);

app.use("/product", ProductRoutes);


//Handling Errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;