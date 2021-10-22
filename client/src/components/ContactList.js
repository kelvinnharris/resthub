import React, { Component } from 'react';
import Contact from "./Contact";
import './ContactList.css';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  getContacts() {
    fetch("http://localhost:8080/api/contacts")
      .then(res => res.json())
      .then(res => {
        console.log(res[0]);
        this.setState({ contacts: res });
      })
  }

  componentWillMount() {
    this.getContacts();
  }

  render() {
    const contacts = this.state.contacts.map((contact) =>
      <Contact details={contact}></Contact>
    );
    return (
      <div class="container main-container">
        <div class="container">
          <h2>Contact List</h2>
          <a class="btn btn-success btn-add" href="/add" role="button">+ Add New Contact</a>
        </div>
        {contacts}
      </div>
    )
  }
}

export default ContactList;