// import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import LeaderboardPage from './pages/Leaderboard.tsx'
import TrackerPage from './pages/Tracker_Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to = "/tracker">Tracker</Link>
    </nav>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tracker" element={<TrackerPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>

</BrowserRouter>
)
