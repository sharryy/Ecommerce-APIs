const router = require('express').Router();
const CartController = require('../controllers/CartController');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

router.use((req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({success: false, message: "Auth-Token Missing. Access Denied"});

    try {
        req.user = jwt.verify(token, jwtSecret);
        next();
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

router.post('/', CartController.createOrder);
router.get('/:id', CartController.getOrder);
router.get('/user/:id', CartController.getUserOrders);

module.exports = router;