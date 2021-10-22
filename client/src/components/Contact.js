import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import EditContact from './EditContact';
import './Contact.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.details._id
    };
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  deleteContact(e) {
    e.preventDefault();

    if (window.confirm(`Confirm delete ${this.props.details.name} from Contact List?`)) {
      fetch(`http://localhost:8080/api/contacts/${this.props.details._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }).then(res => {
        let success = res.ok;
        this.setState({ success: success });
      });
    }
  }

  editContact(e) {
    e.preventDefault();

    return <Redirect to={{
      pathname: '/edit',
    }} />
  }

  render() {
    return (
      <div class="card contact-card">
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <h5 class="card-title">{this.props.details.name}</h5>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                Gender
              </div>
              <div class="col-5">
                {this.props.details.gender}
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                Email
              </div>
              <div class="col-5">
                {this.props.details.email}
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                Phone
              </div>
              <div class="col-5">
                {this.props.details.phone}
              </div>
            </div>

            <div class="row">
              <div class="col">
                <button class="btn btn-danger btn-card" onClick={this.deleteContact}>Delete</button>
                <button class="btn btn-warning btn-card" onClick={this.editContact}>Edit</button>
              </div>
            </div>

          </div>
        </div>
      </div >
    );
  }
}

export default Contact;
