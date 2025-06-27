const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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


router.post('/user/:id/upload', upload.single('image'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.profilePic = req.file.path;
  await user.save();
  res.json({ profilePic: req.file.path });
});


router.post("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ message: "Password changed successfully" });
});


module.exports = router;
