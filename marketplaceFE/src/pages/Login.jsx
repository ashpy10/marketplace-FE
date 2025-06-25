import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/Login.css"

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", res.status);

      // Read response as text for debugging
      const text = await res.text();
      console.log("Response text:", text);

      // Parse JSON only if there is text
      const data = text ? JSON.parse(text) : {};

      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        navigate("/account");
      } else {
        setError(data.error || `Login failed: ${res.statusText}`);
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Dont have an account?</p>
      <Link to="/register">Sign Up</Link>
    </div>
  );
}