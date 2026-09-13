import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import './Dashboard.css';

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/analysis/history');
        setHistory(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleViewAnalysis = (analysis) => {
    navigate('/results', { state: { analysis } });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <span className="tag">Your history</span>
            <h2>Past analyses</h2>
          </div>
          <button className="new-analysis-btn" onClick={() => navigate('/upload')}>
            + New analysis
          </button>
        </div>

        {loading && <p className="muted">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && history.length === 0 && (
          <div className="dashboard-empty">
            <p>You haven't analyzed any resume yet.</p>
            <button onClick={() => navigate('/upload')}>Upload your first resume</button>
          </div>
        )}

        <div className="dashboard-list">
          {history.map((item) => (
            <div
              key={item._id}
              className="dashboard-card"
              onClick={() => handleViewAnalysis(item)}
            >
              <div>
                <h3>{item.targetRole || 'Untitled analysis'}</h3>
                <p className="dashboard-filename">
                  {item.currentSkills?.length || 0} skills matched · {item.missingSkills?.length || 0} gaps found
                </p>
              </div>
              <div className="dashboard-meta">
                <span className="dashboard-date">
                  {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;