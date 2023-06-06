// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated (you can use any authentication mechanism here)
  const isAuthenticated = req.session && req.session.user;

  if (isAuthenticated) {
    // User is authenticated, allow the request to proceed
    next();
  } else {
    // User is not authenticated, send an error response or redirect to a login page
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Protected route that requires authentication
app.get('/post', isAuthenticated, (req, res) => {
  // Data of posts
  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    // ...
  ];

  res.json(posts);
});