const express = require('express');

const app = express();

app.get('/post', (req, res) => {
  const posts = [];

  // Generating 20 posts
  for (let i = 1; i <= 20; i++) {
    posts.push({ id: i, title: `Post ${i}` });
  }

  res.json(posts);
});

// Starting the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});