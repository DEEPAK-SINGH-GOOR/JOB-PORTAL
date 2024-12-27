import { signup } from "../api/auth/auth.js";
import { Navbar } from "../components/navbar.js";
import { getValue } from "../helper/helper.js";

document.getElementById("navbar").innerHTML = Navbar();

const form = document.getElementById("signupForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("username", getValue("username"));
  formData.append("email", getValue("email"));
  formData.append("password", getValue("password"));
  formData.append("firstName", getValue("firstName"));
  formData.append("lastName", getValue("lastName"));
  formData.append("phoneNumber", getValue("phoneNumber"));
  const fileInput = document.getElementById("profilePicture").files[0];
  if (fileInput) {
    formData.append("profilePicture", fileInput);
  }
  formData.append("role", "jobseeker");

  try {
    const response = await signup(formData);
    if (response.ok) {
      alert(result.message);
      form.reset();
    } else {
      document.getElementById("errorMessage").innerHTML = result.message;
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("errorMessage").innerHTML = "Something went wrong!";
  }
});
