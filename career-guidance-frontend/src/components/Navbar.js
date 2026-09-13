import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/upload" className="navbar-logo">
        <span className="dot">•</span> Career Compass
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <span className="navbar-user">{user?.name}</span>
        <button className="navbar-logout" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}

export default Navbar;