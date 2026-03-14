document.getElementById('signupBtn').onclick = function () {
  const firstName       = document.getElementById('firstName').value.trim();
  const lastName        = document.getElementById('lastName').value.trim();
  const email           = document.getElementById('email').value.trim();
  const password        = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  if (!email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('oyumind_users') || '{}');
  if (users[email]) {
    alert('An account with this email already exists. Please log in instead.');
    return;
  }

  localStorage.setItem('oyumind_pending', JSON.stringify({
    firstName, lastName, email, password
  }));

  location.href = 'oyumind-verify.html';
};
