const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
require('dotenv').config();


const validations = require('../middleware/authvalidations');
const controllers = require('../controllers/authcontrollers');

console.log('authvalidation:', validations);
console.log('authcontrollers:', controllers);


router.post('/signup', validations.signupValidation,  controllers.signup);
router.post('/login', validations.loginValidation,controllers.login);

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); 
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/user/:id/upload', upload.single('image'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
   const filePath = req.file.path.replace(/\\/g, "/"); 
  user.profilePic = filePath;
  await user.save();
  res.json({ profilePic: req.file.path });
});

router.put("/user/:id", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
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

router.post('/forgot-password', (req, res) => {
    const {email} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER ,
               pass: process.env.EMAIL_PASS
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL_USER ,
            to: user.email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
})
router.post('/reset_password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== id) return res.status(401).json({ message: "Invalid token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password reset successful", Status: "Success" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
