import React, { Component } from 'react';
import './AddContact.css';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      success: false,
      name: '',
      gender: '',
      email: '',
      phone: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
    // console.log(this.state);
  }

  handleSubmit(event) {
    this.setState({ isSubmitted: true });

    fetch("http://localhost:8080/api/contacts", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        gender: this.state.gender,
        email: this.state.email,
        phone: this.state.phone
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        console.log(res.message);
        let success = res.status === 'success';
        this.setState({ success: success, message: res.message, data: res.data});
      });
  }

  render() {
    const isSubmitted = this.state.isSubmitted;
    const success = this.state.success;

    if (!isSubmitted) {
      return (
        <div class="container main-container">
          <h2>Add New Contact</h2>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group my-3">
              <label>Name</label>
              <input type="text" class="form-control" id="name" value={this.state.name} onChange={this.handleInputChange} />
            </div>

            <div class="form-group my-3">
              <label>Gender</label>
              <input type="text" class="form-control" id="gender" value={this.state.gender} onChange={this.handleInputChange} />
            </div>

            <div class="form-group my-3">
              <label>Email</label>
              <input type="email" id="email" class="form-control" value={this.state.email} onChange={this.handleInputChange} />
            </div>

            <div class="form-group my-3">
              <label>Phone</label>
              <input type="tel" id="phone" class="form-control" value={this.state.phone} onChange={this.handleInputChange} />
            </div>
            <br />
            <div id="btn-submit">
              <input type="submit" class="btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      );
    }

    else {
      if (this.state.success) {
        return (
          <div class="container main-container">
            <h2>{this.state.message}</h2>

            <br />

            <div class="card contact-card">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title">{this.state.data.name}</h5>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      Gender
                    </div>
                    <div class="col-5">
                      {this.state.data.gender}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      Email
                    </div>
                    <div class="col-5">
                      {this.state.data.email}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      Phone
                    </div>
                    <div class="col-5">
                      {this.state.data.phone}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div class="container main-container">
            <h2>Failed to add new contact :(</h2>
          </div>
        );
      }
    }
  }
}

export default AddContact;