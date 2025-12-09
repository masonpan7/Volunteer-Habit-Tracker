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
  const username = localStorage.getItem('user')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }

  return (
    <nav style={{ 
      padding: '1.25rem 2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link 
        to="/" 
        style={{
          ...navLinkStyle,
          fontSize: '1.25rem',
          fontWeight: '700',
          marginRight: '1rem',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <img 
          src="/logo1.png" 
          alt="Logo" 
          style={{ 
            height: '40px', 
            width: '40px', 
            objectFit: 'cover', 
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }} 
        />
        Helping Hands
      </Link>
      
      {!isLoggedIn ? (
        <>
          <Link 
            to="/leaderboard" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Leaderboard
          </Link>
          <Link 
            to="/tracker" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Tracker
          </Link>
          
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                        <Link 
              to="/login" 
              style={navLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              style={navLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Register
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link 
            to="/tracker" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Dashboard
          </Link>
          <Link 
            to="/leaderboard" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Leaderboard
          </Link>
          
          <div style={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem' 
          }}>
            <span style={{ 
              color: 'white', 
              fontWeight: '600',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              fontSize: '0.95rem'
            }}>
              {username}
            </span>
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                background: 'rgba(239, 68, 68, 0.3)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Logout
            </button>
          </div>
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
