import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <>
        <Navbar />
        <div className="results-container">
          <div className="results-box">
            <p>No analysis found.</p>
            <button onClick={() => navigate('/upload')}>Upload a resume</button>
          </div>
        </div>
      </>
    );
  }

  const {
    targetRole,
    currentSkills = [],
    missingSkills = [],
    recommendations = [],
    careerPaths = [],
    learningResources = [],
  } = analysis;

  return (
    <>
      <Navbar />
      <div className="results-container">
        <div className="results-box">
          <span className="tag">Analysis Complete</span>
          <h2>Your skill map for {targetRole}</h2>

          <div className="results-grid">
            <div className="results-card">
              <h3>What you already have</h3>
              <ul>
                {currentSkills.length > 0
                  ? currentSkills.map((s, i) => <li key={i}>{s}</li>)
                  : <li className="muted">None found</li>}
              </ul>
            </div>

            <div className="results-card gap-card">
              <h3>What's missing</h3>
              <ul>
                {missingSkills.length > 0
                  ? missingSkills.map((s, i) => <li key={i}>{s}</li>)
                  : <li className="muted">None - great match!</li>}
              </ul>
            </div>

            <div className="results-card">
              <h3>Career paths to consider</h3>
              <ul>
                {careerPaths.length > 0
                  ? careerPaths.map((c, i) => <li key={i}>{c}</li>)
                  : <li className="muted">No suggestions</li>}
              </ul>
            </div>

            <div className="results-card">
              <h3>Where to learn it</h3>
              <ul>
                {learningResources.length > 0
                  ? learningResources.map((r, i) => <li key={i}>{r}</li>)
                  : <li className="muted">No resources</li>}
              </ul>
            </div>
          </div>

          <div className="results-card">
            <h3>Recommendations</h3>
            <ul>
              {recommendations.length > 0
                ? recommendations.map((r, i) => <li key={i}>{r}</li>)
                : <li className="muted">No recommendations</li>}
            </ul>
          </div>

          <div className="results-actions">
            <Link to="/upload" className="btn-outline">Analyze another resume</Link>
            <Link to="/dashboard" className="btn-solid">View dashboard</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;