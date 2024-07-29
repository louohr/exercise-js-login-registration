document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registrationForm");
  const loginForm = document.getElementById("loginForm");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const welcomeText = document.getElementById("welcomeText");
  const signInLink = document.getElementById("signInLink");
  const submitButton = document.getElementById("submitButton");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");

  signInLink.addEventListener("click", (e) => {
    e.preventDefault();
    registrationForm.style.display = "none";
    loginForm.style.display = "block";
  });

  confirm.addEventListener("input", () => {
    if (password.value === confirm.value) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });

  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("userName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    const user = { name, username, email, password };
    saveUserToLocalStorage(user);
    showWelcomeMessage(name);
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const user = users.find(
      (user) => user.username === loginUsername && user.password === loginPassword
    );

    if (user) {
      showWelcomeMessage(user.name);
    } else {
      alert("Invalid username or password.");
    }
  });

  function saveUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    users.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }

  function showWelcomeMessage(name) {
    registrationForm.style.display = "none";
    loginForm.style.display = "none";
    welcomeText.textContent = `Welcome ${name}!`;
    welcomeMessage.style.display = "block";
  }
});
