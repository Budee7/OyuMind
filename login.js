document.querySelector('.btn').onclick = function () {
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please enter your email and password.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('oyumind_users') || '{}');

  if (!users[email]) {
    alert('No account found with that email. Please sign up first.');
    return;
  }

  if (users[email].password !== password) {
    alert('Incorrect password. Please try again.');
    return;
  }

  localStorage.setItem('oyumind_loggedIn', email);
  location.href = 'oyumind-dashboard.html';
};
