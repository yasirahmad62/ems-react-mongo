import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";

class NavBar extends Component {
  render() {
    return (
      <div className="card-nav">
        <nav className="navbar">
          <div className="navbar-container">
            <NavLink to="/" className="nav-link" activeClassName="active-link">
              Home
            </NavLink>
            <NavLink to="/add" className="nav-link" activeClassName="active-link">
              Add Employee
            </NavLink>
            <NavLink to="/list" className="nav-link" activeClassName="active-link">
              View List
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
