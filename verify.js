const inputs = [
  document.getElementById('c1'),
  document.getElementById('c2'),
  document.getElementById('c3'),
  document.getElementById('c4')
];
const btn  = document.querySelector('.btn');
const card = document.querySelector('.card');

// Auto-jump to next box
function jump(el, nextId) {
  el.value = el.value.replace(/\D/g, '');
  if (el.value.length === 1 && nextId) {
    document.getElementById(nextId).focus();
  }
  checkComplete();
}

// Enable/disable verify button
function checkComplete() {
  btn.disabled = inputs.some(input => !input.value);
}

// Start with button disabled
btn.disabled = true;
document.getElementById('c1').focus();

// Backspace support
inputs.forEach((input, i) => {
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && !input.value && i > 0) {
      inputs[i - 1].value = '';
      inputs[i - 1].focus();
      checkComplete();
    }
  });
});

// Shake animation on wrong code
function shake() {
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'shake 0.4s ease';
}

// Inject shake keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-5px); }
    80%      { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Verify button click
btn.onclick = function () {
  const code = inputs.map(i => i.value).join('');

  if (code === '1234') {
    // Save the pending signup to confirmed users
    const pending = JSON.parse(localStorage.getItem('oyumind_pending') || 'null');
    if (pending) {
      const users = JSON.parse(localStorage.getItem('oyumind_users') || '{}');
      users[pending.email] = {
        firstName: pending.firstName,
        lastName:  pending.lastName,
        password:  pending.password
      };
      localStorage.setItem('oyumind_users', JSON.stringify(users));
      localStorage.removeItem('oyumind_pending');
      localStorage.setItem('oyumind_loggedIn', pending.email);
    }

    btn.textContent = '✓ Verified';
    btn.style.background = '#059669';
    inputs.forEach(i => i.disabled = true);
    setTimeout(() => location.href = 'oyumind-dashboard.html', 1000);

  } else {
    shake();
    inputs.forEach(i => { i.value = ''; i.disabled = false; });
    btn.disabled = true;
    btn.textContent = 'Try again';
    setTimeout(() => btn.textContent = 'Verify', 1000);
    inputs[0].focus();
  }
};
