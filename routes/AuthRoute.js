const express = require('express');
const authServices = require('../service/AuthService')

const authRouter = express.Router();

authRouter.post('/api/login',authServices.createJWT)
authRouter.get('/api/profile',authServices.verifyToken)

module.exports = authRouter;

