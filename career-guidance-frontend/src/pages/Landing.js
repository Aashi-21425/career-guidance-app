import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-icon"></div>
        <span className="tag">AI-Powered Career Guidance</span>
        <h1>Know exactly<br />what's next.</h1>
        <p>
          Upload your resume. Get a clear map of the skills you have,
          the ones you are missing, and the shortest path to the role you want.
        </p>
        <div className="landing-buttons">
          <Link to="/signup" className="btn-primary">Sign Up</Link>
          <Link to="/login" className="btn-secondary">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;