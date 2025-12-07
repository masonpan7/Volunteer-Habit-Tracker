import { useState } from 'react'
import './Register.css'
// import { resolvePath, unstable_setDevServerHooks } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [msg, setMsg] = useState("");
    const [showPass, setShowPass] = useState(false);

    // Connect to backend to handle register submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (pass !== confirmPass) {
            setMsg("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, user, pass }),
            });
        
            const data = await res.json();
            if (res.ok) {
                setUser("");
                setPass("");
                setMsg("Registration successful");
            } else {
                setMsg(`Error: ${data.detail}`);
            }
        } catch (err) {
            console.error(err);
            setMsg("Error: Problem connecting to server");
        }
    }

    return (
        <div className='form-container'>
            <h1>Register</h1>
    
            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: "0.5rem", padding: "0.5rem" }}
                    required
                /><br/>

                <input 
                    type="text"
                    placeholder="Username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    style={{ margin: "0.5rem", padding: "0.5rem" }}
                    required
                /><br/>

                {/* Input password text box 
                    User can hide/show the password they entered */}
                <div className="password-wrapper">
                    <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        style={{ margin: "0.5rem", padding: "0.5rem" }}
                        required
                    /><br/>
                    <button 
                        type="button"
                        className="password-btn"
                        onClick={() => setShowPass(!showPass)}
                    > 
                        {showPass ? "Hide" : "Show"}
                    </button>
                </div>

                <input 
                    type="password"
                    placeholder="Repeat Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    style={{ margin: "0.5rem", padding: "0.5rem" }}
                    required
                /><br/>
    
                <button type="submit">Create Account</button>
            </form>
    
            {msg && <p style={{ marginTop: "1rem", fontSize:"1.1rem", fontWeight:"bold"}}>{msg}</p>}
        </div>
    );
}