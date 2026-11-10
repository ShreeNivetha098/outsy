import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">🌿 OUTSY</NavLink>
      <div className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/create">Create Plan</NavLink>
        <NavLink to="/plans">My Plans</NavLink>
      </div>
      <div className="nav-user">
        {user && <span>Hi, {user.name}</span>}
        <button type="button" className="link-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
