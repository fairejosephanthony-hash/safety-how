import React from "react";

const events = [
  { name: "Fire Safety Training", date: "Jan 25, 2025" },
  { name: "Chemical Handling Workshop", date: "Feb 15, 2025" },
  { name: "Workplace Hazard Awareness", date: "Mar 20, 2025" },
  { name: "Emergency Evacuation Drill", date: "Apr 10, 2025" }
];

export default function Events() {
  return (
    <div className="events">

      <div className="events-header">
        Events you can join!
      </div>

      {events.map((e, i) => (
        <div key={i} className="event">

          <div>
            <h5>{e.name}</h5>
            <span>{e.date}</span>
          </div>

          <button className="interest-btn">
            Interested
          </button>

        </div>
      ))}

    </div>
  );
}