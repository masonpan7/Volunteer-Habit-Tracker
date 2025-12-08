import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Tracker_Dashboard from './pages/Tracker_Dashboard.tsx'
import Leaderboard from './pages/Leaderboard.tsx'

function Navigation() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <nav style={{ 
      padding: '1rem', 
      background: '#333', 
      display: 'flex', 
      gap: '1rem',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      {!isLoggedIn ? (
        <>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </>
      ) : (
        <>
          <Link to="/tracker" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
          <button 
            onClick={handleLogout}
            style={{ 
              marginLeft: 'auto', 
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  )
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tracker" element={<Tracker_Dashboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </BrowserRouter>
)
