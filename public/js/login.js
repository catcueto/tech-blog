// TODO: Login
const usernameLogin = document.getElementById("username-login");
const pwLogin = document.getElementById("password-login");
const loginEl = document.getElementById("login-btn");

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameLogin.value,
        password: pwLogin.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the default page
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

loginEl.addEventListener("click", loginFormHandler);
