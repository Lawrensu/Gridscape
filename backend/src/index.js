// Importing the required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authenticateToken = require('./middleware/auth');
const adminMiddleware = require('./middleware/adminMiddleware');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/posts', postRoutes); // Allow viewing posts without authentication
app.use('/api/comments', commentRoutes); // Allow viewing comments without authentication
app.use('/api/admin', authenticateToken, adminMiddleware, adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// User Registration
app.post('/register', async (req, res) => {
  const { email, password, secretCode } = req.body;
  if (secretCode !== process.env.SECRET_CODE) {
    return res.status(401).send('Invalid secret code');
  }
  const user = await prisma.user.create({
    data: { email, password },
  });
  res.json(user);
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).send('Invalid Credentials');
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
  res.json({ token });
});

// Create a new post
app.post('/posts', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.userId,
    },
  });
  res.json(post);
});

// Get all posts
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
  });
  res.json(posts);
});

// Add a comment
app.post('/comments', authenticateToken, async (req, res) => {
  const { content, postId } = req.body;
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: req.user.userId,
    },
  });
  res.json(comment);
});

// Delete a comment (for admin)
app.delete('/comments/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id: parseInt(id) },
  });
  res.sendStatus(204);
});

// Delete a post (for admin)
app.delete('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: { id: parseInt(id) },
  });
  res.sendStatus(204);
});

// Delete a user (for admin)
app.delete('/users/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.sendStatus(204);
});