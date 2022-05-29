const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const app = express();

const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const CartRoutes = require('./routes/CartRoutes');
const swaggerJson = require('./swagger.json');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", UserRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", ProductRoutes);
app.use("/cart", CartRoutes);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerJson));

app.get('/', (req, res) => {
    res.json('API is working...Append /api-docs to see the documentation');
});

//Handling Errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;