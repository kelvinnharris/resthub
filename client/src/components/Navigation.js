import React from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div class="container">

          <Link class="navbar-brand" to="/">
            Contact List
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li class='nav-item'>
                <Link class="nav-link" to="/list">Contact List</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);