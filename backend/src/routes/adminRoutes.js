// filepath: /d:/Projects/Gridscape/Gridscape/backend/src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const adminMiddleware = require('../middleware/adminMiddleware');

router.use(adminMiddleware);

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { email, role },
  });
  res.json(user);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: parseInt(id) } });
  res.send('User deleted');
});

module.exports = router;