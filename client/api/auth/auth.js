import baseURL from "../config/api.js";

export const signup = async (data) => {
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });
    console.log(response);
    // return await response.json();
  } catch (error) {
    console.error("Signup API Error:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};
