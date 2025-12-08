import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>Volunteer Habit Tracker</h1>
      <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
        Track your volunteer hours, earn points, and compete on the leaderboard!
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          onClick={() => navigate('/login')}
          style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/register')}
          style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default App
