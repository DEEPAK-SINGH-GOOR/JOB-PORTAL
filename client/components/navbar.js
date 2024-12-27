export function Navbar() {
  return `
    <nav style="background-color: #172831; padding: 1rem; color: white;">
      <ul style="list-style: none; display: flex; justify-content: space-around; margin: 0; padding: 0;">
        <li><a href="/" style="color: white; text-decoration: none;">Home</a></li>
        <li><a href="/client/pages/signup.html" style="color: white; text-decoration: none;">Signup</a></li>
        <li><a href="/client/pages/login.html" style="color: white; text-decoration: none;">Login</a></li>
      </ul>
    </nav>
  `;
}
