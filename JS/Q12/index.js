const blogList = document.getElementById('blogList');
const addBlogForm = document.getElementById('addBlogForm');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');

// Fetch data from JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    // Display the fetched blog posts
    data.forEach(blog => {
      displayBlog(blog);
    });
  });

// Function to display a single blog post
function displayBlog(blog) {
  const blogElement = document.createElement('div');
  blogElement.classList.add('blog');

  const titleElement = document.createElement('h3');
  titleElement.textContent = blog.title;

  const bodyElement = document.createElement('p');
  bodyElement.textContent = blog.body;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteBlog(blogElement, blog.id);
  });

  blogElement.appendChild(titleElement);
  blogElement.appendChild(bodyElement);
  blogElement.appendChild(deleteButton);

  blogList.appendChild(blogElement);
}

// Function to delete a blog post
function deleteBlog(blogElement, blogId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      blogList.removeChild(blogElement);
      console.log(`Blog ${blogId} deleted successfully!`);
    }
  })
  .catch(error => console.log(error));
}

// Event listener for the form submission
addBlogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const body = bodyInput.value;

  // Create a new blog object
  const newBlog = {
    title: title,
    body: body,
    userId: 1 // Assuming userId as 1
  };

  // Send a POST request to create a new blog
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBlog)
  })
  .then(response => response.json())
  .then(data => {
    displayBlog(data);
    addBlogForm.reset();
    console.log('Blog added successfully!');
  })
  .catch(error => console.log(error));
});







