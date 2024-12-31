const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
  res.json(user);
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).send('Invalid Credentials');
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid Credentials');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
  res.json({ token });
};

module.exports = { registerUser, loginUser };