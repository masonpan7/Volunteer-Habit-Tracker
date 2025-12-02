import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TrackerPage from './pages/Tracker_Dashboard';
import LeaderboardPage from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation (optional - for testing) */}
        <nav style={{ padding: '20px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
          <Link to="/tracker">Tracker Dashboard</Link>
          <Link to="/leaderboard" style={{ marginLeft: '20px' }}>Leaderboard</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple home page component
function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Volunteer Habit Tracker</h1>
    </div>
  );
}

export default App;