import { login } from "../api/auth/auth.js";
import { Navbar } from "../components/navbar.js";
import { getValue } from "../helper/helper.js";

// Render Navbar
document.getElementById("navbar").innerHTML = Navbar();

// Select Form
const form = document.getElementById("loginForm");

// Form Submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get Form Data
  const email = getValue("email");
  const password = getValue("password");

  // Clear Previous Error Message
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";

  // Validate Input
  if (!email || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  // Request Body
  const data = { email, password };

  try {
    // API Request
    const response = await login(data);

    if (response.ok) {
      alert(response.message);
      localStorage.setItem("authToken", response.token);
    } else {
      errorMessage.textContent = response.message || "Login failed.";
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.textContent = "Something went wrong. Please try again later.";
  }
});
