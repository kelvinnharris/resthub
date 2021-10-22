import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div class="container main-home-container">

        <div class="jumbotron">
          <h1 class="display-4">Contact List</h1>
          <p class="lead">A simple contact list service for storing contact information.</p>
          <hr class="my-3" />

          <div class="main-logo">
            {/* <img src={logo} class="img-fluid my-5"></img> */}
          </div>

          <br />
          <p>You can make HTTP GET, POST, PUT and DELETE requests to interact with your contact list.</p>

          <p class="lead">
            <a class="btn btn-primary" href="/add" role="button">Get Started</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;