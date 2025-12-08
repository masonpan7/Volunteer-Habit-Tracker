import { useState } from "react";
// import { useNavigate } from "react-router";
import "./Register.css"; 

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              username: user, 
              password: pass }),
        });
    
        const data = await res.json();
        if (res.ok) {
            // store username into localStorage
            localStorage.setItem("user", user);
            localStorage.setItem("token", data.access_token);

            setMsg(`Logged in as ${user}`);
        } else {
            setMsg(`Error: ${data.detail}`);
        }
    } catch (err) {
        console.error(err);
        setMsg("Error: Problem connecting to server");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {msg && <p style={{ marginTop: "1rem" }}>{msg}</p>}
    </div>
  );
}