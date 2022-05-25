const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const app = express();

const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const swaggerJson = require('./swagger.json');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", UserRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", ProductRoutes);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerJson));

//Handling Errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;