document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;
        // Use fetch or XMLHttpRequest to send login data to server
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, password })
        })
        .then(response => {
          if (response.ok) {
            window.location.href = '/index.html'; // Redirect on successful login
          } else {
            // Handle invalid credentials or other errors
            console.error('Login failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
      registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUserId = document.getElementById('newUserId').value;
        const newPassword = document.getElementById('newPassword').value;
        // Use fetch or XMLHttpRequest to send registration data to server
        fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newUserId, newPassword })
        })
        .then(response => {
          if (response.ok) {
            window.location.href = '/index.html'; // Redirect after successful registration
          } else {
            // Handle registration errors
            console.error('Registration failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  });
  