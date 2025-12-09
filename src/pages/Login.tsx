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
                password: pass 
            }),
        });
    
        const data = await res.json();
        if (res.ok) {
            // Store token and username
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", user);

            setMsg(`Logged in as ${user}. Redirecting to tracker...`);
            // Redirect to dashboard after 1 second
            setTimeout(() => {
                window.location.href = '/tracker';
            }, 1000);
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
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.75rem" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.75rem" }}
          required
        />
        <button type="submit">Login</button>
      </form>

      {msg && <p style={{ marginTop: "1rem" }}>{msg}</p>}
    </div>
  );
}