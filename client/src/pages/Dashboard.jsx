import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome{user ? `, ${user.name}` : ""} 🌿</h1>
      <p className="tagline">Where shall we head out today?</p>

      <div className="card-grid">
        <Link to="/create" className="action-card">
          <h2>Plan a day out</h2>
          <p>Tell us your time, budget and company. We’ll build the day.</p>
        </Link>
        <Link to="/plans" className="action-card">
          <h2>My plans</h2>
          <p>See the outings you’ve saved.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
