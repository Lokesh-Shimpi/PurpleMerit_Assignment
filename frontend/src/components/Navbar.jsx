import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div>
        <Link to="/profile">Profile</Link>
        <Link to="/change-password">Change Password</Link>

        {user.role === "admin" && <Link to="/admin">Admin</Link>}
      </div>

      <div className="navbar-right">
        <span>
          {user.fullName} ({user.role})
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
