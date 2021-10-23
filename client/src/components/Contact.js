import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Contact.css';

function Contact(props) {
  const [_id, setId] = useState(props.details._id);
  const [success, setSuccess] = useState(false);
  const contact = props.details;
  const history = useHistory();

  const deleteContact = (e) => {
    e.preventDefault();

    if (window.confirm(`Confirm delete ${props.details.name} from Contact List?`)) {
      fetch(`http://localhost:8080/api/contacts/${props.details._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }).then(res => {
        let success = res.ok;
        setSuccess(success);
        history.go(0);
      });
    }
  }

  const editContact = (e) => {
    e.preventDefault();
    history.push({ pathname: `/edit/${_id}`, state: { details: contact } });
  }

  return (
    <div class="card contact-card">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col">
              <h5 class="card-title">{props.details.name}</h5>
            </div>
          </div>

          <div class="row">
            <div class="col-3">
              Gender
            </div>
            <div class="col-5">
              {props.details.gender}
            </div>
          </div>

          <div class="row">
            <div class="col-3">
              Email
            </div>
            <div class="col-5">
              {props.details.email}
            </div>
          </div>

          <div class="row">
            <div class="col-3">
              Phone
            </div>
            <div class="col-5">
              {props.details.phone}
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button class="btn btn-danger btn-card" onClick={deleteContact}>Delete</button>
              <button class="btn btn-warning btn-card" onClick={editContact}>Edit</button>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default Contact;
