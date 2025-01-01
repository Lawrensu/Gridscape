const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// User Registration
const registerUser = async (req, res) => {
  const { email, password, secretCode, role } = req.body;

  if (secretCode !== process.env.SECRET_CODE) {
    return res.status(401).send('Invalid secret code');
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || 'user',
    },
  });

  // Generate a confirmation token
  const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  // Send confirmation email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Confirmation',
    text: `Please confirm your email by clicking the following link: http://localhost:3000/confirm/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.json(user);
};

// Email Confirmation
const confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { confirmed: true },
    });
    res.send('Email confirmed successfully');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
};

module.exports = { registerUser, loginUser, confirmEmail };