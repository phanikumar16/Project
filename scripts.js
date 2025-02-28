const API_URL = "https://your-api-gateway-url.amazonaws.com/prod"; // Replace with your API Gateway URL

// DOM Elements
const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');
const createPostForm = document.getElementById('create-post-form');
const showLoginLink = document.getElementById('showLogin');
const showRegisterLink = document.getElementById('showRegister');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginForm');
const createPostFormElement = document.getElementById('createPostForm');
const postsContainer = document.getElementById('posts');

// Toggle between Registration and Login Forms
showLoginLink.addEventListener('click', () => {
  registrationForm.style.display = 'none';
  loginForm.style.display = 'block';
});

showRegisterLink.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registrationForm.style.display = 'block';
});

// Register User
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  alert(data.body);
  registrationForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Login User
loginFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert('Login successful!');
    loginForm.style.display = 'none';
    createPostForm.style.display = 'block';
    fetchPosts();
  } else {
    alert('Login failed: ' + data.body);
  }
});

// Create Post
createPostFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('postContent').value;
  const imageFile = document.getElementById('postImage').files[0];

  const formData = new FormData();
  formData.append('content', content);
  formData.append('image', imageFile);

  const response = await fetch(`${API_URL}/create-post`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  alert(data.body);
  fetchPosts();
});

// Fetch and Display Posts
async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const posts = await response.json();
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <p>${post.content}</p>
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image">` : ''}
    `;
    postsContainer.appendChild(postElement);
  });
}