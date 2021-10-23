import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EditContact.css';

function EditContact(props) {
  let location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(location.state.details.name);
  const [gender, setGender] = useState(location.state.details.gender);
  const [email, setEmail] = useState(location.state.details.email);
  const [phone, setPhone] = useState(location.state.details.phone);

  const [responseData, setResponseData] = useState('');

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    if (id == 'name') setName(value);
    if (id == 'gender') setGender(value);
    if (id == 'email') setEmail(value);
    if (id == 'phone') setPhone(value);
  }

  const handleSubmit = (event) => {
    setIsSubmitted(true);

    fetch(`http://localhost:8080/api/contacts/${location.state.details._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        gender: gender,
        email: email,
        phone: phone
      })
    }).then(res => res.json())
      .then(res => {
        console.log(`res`);
        console.log(res);
        console.log(`res.message`);
        console.log(res.message);
        let success = res.status == 'success';
        setSuccess(success);
        setMessage(res.message);
        setResponseData(res.data);
      });
  }

  // var isSubmitted = this.state.isSubmitted;
  // var success = this.state.success;

  if (!isSubmitted) {
    return (
      <div class="container main-container">
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group my-3">
            <label>Name</label>
            <input type="text" class="form-control" id="name" value={name} onChange={handleInputChange} />
          </div>

          <div class="form-group my-3">
            <label>Gender</label>
            <input type="text" class="form-control" id="gender" value={gender} onChange={handleInputChange} />
          </div>

          <div class="form-group my-3">
            <label>Email</label>
            <input type="email" id="email" class="form-control" value={email} onChange={handleInputChange} />
          </div>

          <div class="form-group my-3">
            <label>Phone</label>
            <input type="tel" id="phone" class="form-control" value={phone} onChange={handleInputChange} />
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
    if (success) {
      return (
        <div class="container main-container">
          <h2>{message}</h2>

          <br />

          <div class="card contact-card">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title">{responseData.name}</h5>
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    Gender
                  </div>
                  <div class="col-5">
                    {responseData.gender}
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    Email
                  </div>
                  <div class="col-5">
                    {responseData.email}
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    Phone
                  </div>
                  <div class="col-5">
                    {responseData.phone}
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

export default EditContact;