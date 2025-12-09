import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <div style={{ 
      padding: '3rem 2rem',
      minHeight: '85vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      maxWidth: '1400px',
      margin: '0 auto',
      alignItems: 'center'
    }}>
      {/* Left Side - Logo and Title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        <img 
          src="/logo1.png" 
          alt="Logo" 
          style={{ 
            width: '220px', 
            height: '220px', 
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }} 
        />
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
          lineHeight: '1.2',
          margin: 0
        }}>
          Helping Hands
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255, 255, 255, 0.85)',
          textAlign: 'center',
          maxWidth: '450px',
          lineHeight: '1.6',
          margin: 0
        }}>
          Track your volunteer hours, earn points, and compete on the leaderboard!
        </p>
      </div>

      {/* Right Side - Login/Register Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '32px',
        padding: '3rem 2.5rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Get Started
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          Join our community of volunteers <br />making a difference
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <button 
            onClick={() => navigate('/register')}
            style={{ 
              padding: '1.25rem', 
              fontSize: '1.1rem',
              fontWeight: '700',
              width: '100%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)'
            }}
          >
            Create Account
          </button>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              padding: '1.25rem', 
              fontSize: '1.1rem',
              fontWeight: '700',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
