import * as React from "react";
import "./LandingPage.css";

export default function LandingPage({}) {
  return (
    <div className="landing-page">
      <div className="content">
        <div className="hero">
          <img
            src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg"
            alt="hero image" className="hero-img"/>
        </div>
        <div className="cta">
        <h1>Life Tracker</h1>
          <p>Helping you take back control of your world</p>
        </div>
        </div>
      </div>
  );
}