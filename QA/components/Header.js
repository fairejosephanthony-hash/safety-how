import React from "react";

export default function Header() {
  return (
    <header className="header">

      <div className="logo">
        safety <span>how</span>
      </div>

      <nav className="nav">
        <a>Home</a>
        <a>Feeds</a>
      </nav>

      <input
        className="global-search"
        placeholder="Search"
      />

      <div className="icons">
        <div className="icon">✉</div>
        <div className="icon">◻</div>
        <div className="icon">🔔</div>
      </div>

      <div className="avatar">GM</div>

    </header>
  );
}