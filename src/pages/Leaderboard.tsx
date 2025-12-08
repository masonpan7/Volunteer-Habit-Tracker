import { useState, useEffect } from 'react';
import './Leaderboard.css';

interface LeaderboardUser {
  rank: number;
  username: string;
  totalPoints: number;
  totalHours: number;
  badges?: string[];
  isCurrentUser?: boolean;
}

interface CurrentUser {
  username: string;
  totalPoints: number;
  totalHours: number;
  rank: number;
}

interface Badge {
  name: string;
  threshold: number;
  icon: string;
  color: string;
  type?: string;
}

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [userBadges, setUserBadges] = useState<string[]>([]);
    const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');

    const badgeDefinitions: Badge[] = [
        { name: 'Novice', threshold: 10, icon: '🌱', color: 'novice' },
        { name: 'Contributor', threshold: 25, icon: '⭐', color: 'contributor' },
        { name: 'Professional', threshold: 50, icon: '💎', color: 'professional' },
        { name: 'Expert', threshold: 100, icon: '👑', color: 'expert' },
        { name: 'Healthcare Hero', threshold: 20, icon: '🏥', color: 'healthcare', type: 'Healthcare' },
        { name: 'Education Champion', threshold: 20, icon: '📚', color: 'education', type: 'Education' },
        { name: 'Environment Guardian', threshold: 20, icon: '🌍', color: 'environment', type: 'Environment' }
    ];


    const fetchLeaderboard = async () => {
        try {
        const response = await fetch(`/api/leaderboard?filter=${timeFilter}`);
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
        } catch (error) {
        console.error('Error fetching leaderboard:', error);
        
        // Fake data for testing
        setLeaderboard([
            { rank: 1, username: 'Sarah_Chen', totalPoints: 245, totalHours: 122, badges: ['Expert', 'Healthcare Hero'] },
            { rank: 2, username: 'Mike_Johnson', totalPoints: 198, totalHours: 99, badges: ['Professional', 'Education Champion'] },
            { rank: 3, username: 'Emma_Davis', totalPoints: 176, totalHours: 88, badges: ['Professional'] },
            { rank: 4, username: 'Alex_Kim', totalPoints: 142, totalHours: 71, badges: ['Professional'] },
            { rank: 5, username: 'You', totalPoints: 128, totalHours: 64, badges: ['Contributor'], isCurrentUser: true }
        ]);
        }
    };

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setCurrentUser(data);
      setUserBadges(data.badges || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
        // Fake data for testing
        setCurrentUser({ username: 'You', totalPoints: 128, totalHours: 64, rank: 5 });
        setUserBadges(['Contributor']);
    }
  };

  useEffect(() => {
        (async () => {
        await fetchLeaderboard();
        await fetchUserData();
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeFilter]);

    const getRankDisplay = (rank: number): string => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    const getBadgeClass = (badgeColor: string, earned: boolean): string => {
        if (!earned) return 'badge-card locked';
        return `badge-card earned ${badgeColor}`;
    };

return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        
        {/* ===== USER ACHIEVEMENT STATS ===== */}
        <div className="achievement-header">
          <h1 className="achievement-title">Your Achievement Dashboard</h1>
          
          <div className="achievement-stats-grid">
            <div className="achievement-stat-card">
              <p className="achievement-stat-label">Your Rank</p>
              <p className="achievement-stat-value">
                {currentUser ? getRankDisplay(currentUser.rank) : '—'}
              </p>
            </div>
            <div className="achievement-stat-card">
              <p className="achievement-stat-label">Total Points</p>
              <p className="achievement-stat-value">{currentUser?.totalPoints || 0}</p>
            </div>
            <div className="achievement-stat-card">
              <p className="achievement-stat-label">Total Hours</p>
              <p className="achievement-stat-value">{currentUser?.totalHours || 0}</p>
            </div>
          </div>
        </div>

        {/* ===== BADGES SECTION ===== */}
        <div className="badges-section">
          <h2 className="badges-title">Your Badges</h2>
          
          <div className="badges-grid">
            {badgeDefinitions.map(badge => {
              const earned = userBadges.includes(badge.name);
              return (
                <div
                  key={badge.name}
                  className={getBadgeClass(badge.color, earned)}
                >
                  <div className="badge-icon">{badge.icon}</div>
                  <p className="badge-name">{badge.name}</p>
                  <p className="badge-status">
                    {earned ? 'Earned!' : `${badge.threshold} hours needed`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== LEADERBOARD SECTION ===== */}
        <div className="leaderboard-section">
          <div className="leaderboard-header">
            <h2 className="leaderboard-title">Leaderboard</h2>
            
            <div className="filter-buttons">
              <button
                onClick={() => setTimeFilter('all')}
                className={`filter-button ${timeFilter === 'all' ? 'active' : 'inactive'}`}
              >
                All Time
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`filter-button ${timeFilter === 'month' ? 'active' : 'inactive'}`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimeFilter('week')}
                className={`filter-button ${timeFilter === 'week' ? 'active' : 'inactive'}`}
              >
                This Week
              </button>
            </div>
          </div>

          <div className="leaderboard-list">
            {leaderboard.length === 0 ? (
              <div className="leaderboard-empty">
                No leaderboard data available yet
              </div>
            ) : (
              leaderboard.map((user, index) => (
                <div
                  key={index}
                  className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}
                >
                  <div className="leaderboard-rank">
                    {getRankDisplay(user.rank)}
                  </div>
                  
                  <div className="leaderboard-user-info">
                    <p className="leaderboard-username">
                      {user.username}
                      {user.isCurrentUser && (
                        <span className="current-user-label">(You)</span>
                      )}
                    </p>
                    <div className="leaderboard-badges">
                      {user.badges?.slice(0, 3).map((badgeName, i) => {
                        const badgeInfo = badgeDefinitions.find(b => b.name === badgeName);
                        return badgeInfo ? (
                          <span
                            key={i}
                            className={`leaderboard-badge ${badgeInfo.color}`}
                          >
                            {badgeInfo.icon} {badgeName}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <div className="leaderboard-points-section">
                    <p className="leaderboard-points">
                      {user.totalPoints}
                    </p>
                    <p className="leaderboard-hours">{user.totalHours} hours</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===== POINTS EXPLANATION ===== */}
        <div className="points-explanation">
          <h3 className="points-explanation-title">How Points Work</h3>
          <p className="points-explanation-text">
            Earn 2 points for every hour volunteered. Collect badges by reaching
            milestones and completing different types of volunteer work. Compete with
            others to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );

}