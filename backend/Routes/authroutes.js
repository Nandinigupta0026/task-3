const express = require('express');
const router = express.Router();
const User = require('../Models/user');

const validations = require('../middleware/authvalidations');
const controllers = require('../controllers/authcontrollers');

console.log('authvalidation:', validations);
console.log('authcontrollers:', controllers);


router.post('/signup', validations.signupValidation,  controllers.signup);
router.post('/login', validations.loginValidation,controllers.login);

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
