import React from "react";
import Events from "./Events";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/80"
          className="profile-img"
        />

        <div className="profile-info">
          <h4>Geraldine Marcelo</h4>
          <p>Product Associate</p>
          <span>1,842 Connections</span>
        </div>

      </div>

      <div className="points-card">
        <h3>1,355 POINTS</h3>
        <p>Earn more points through your activity.</p>
      </div>

      <Events />

    </aside>
  );
}