const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory database (replace with a real database in production)
let blogs = [];

// Get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});
// Get a specific blog
app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find(blog => blog.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  res.json(blog);
});

// Create a new blog
app.post('/blogs', (req, res) => {
  const { id, title, content } = req.body;

  // Check if a blog with the same id already exists
  if (blogs.find(blog => blog.id === id)) {
    return res.status(400).json({ error: 'Blog with the same id already exists' });
  }
  const newBlog = { id, title, content };
  blogs.push(newBlog);

  res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
});
// Update a blog
app.put('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  const blog = blogs.find(blog => blog.id === blogId);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;

  res.json({ message: 'Blog updated successfully', blog });
});
// Delete a blog
app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;

  const index = blogs.findIndex(blog => blog.id === blogId);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  const deletedBlog = blogs[index];
  blogs.splice(index, 1);

  res.json({ message: 'Blog deleted successfully', blog: deletedBlog });
});

// Replace a blog
app.put('/blogs/:id/replace', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  const index = blogs.findIndex(blog => blog.id === blogId);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  const newBlog = { id: blogId, title, content };
  blogs[index] = newBlog;

  res.json({ message: 'Blog replaced successfully', blog: newBlog });
});
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});