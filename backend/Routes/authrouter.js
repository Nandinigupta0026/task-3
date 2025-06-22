const express = require('express');
const router = express.Router();


const validations = require('../middleware/authvalidations');
const controllers = require('../controllers/authcontrollers');

console.log('authvalidation:', validations);
console.log('authcontrollers:', controllers);


router.post('/signup', validations.signupValidation,  controllers.signup);
router.post('/login', validations.loginValidation,controllers.login);


module.exports = router;
