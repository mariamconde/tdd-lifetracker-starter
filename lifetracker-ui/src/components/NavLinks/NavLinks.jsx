import * as React from "react";
import { Link } from "react-router-dom";
import "./Navlinks.css";

export default function Navlinks(props) {
  const logoutUser = () => {
    // placeholder, handle with context
    props.setIsLoggedIn(false)
}
  return (
    <ul className="links">
      <li> <Link to="/activity">Activity</Link> </li>
      <li> <Link to="/exercise">Exercise</Link> </li>
      <li> <Link to="/nutrition">Nutrition</Link> </li>
      <li> <Link to="/sleep">Sleep</Link> </li>
      <li> <Link to="/login">Login</Link> </li>
      <li className="btn secondary">
        <Link to="/register">Sign Up</Link>
      </li>
    </ul>
  );
}