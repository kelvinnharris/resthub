import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import Navigation from "./components/Navigation";

import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from "./components/ContactList";

  class App extends Component {constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callRoot() {
    fetch("http://localhost:8080/api/contacts")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
  }

  componentWillMount() {
    this.callRoot();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={AddContact} />
            <Route path="/edit/:id" component={EditContact} />
            <Route path="/list" component={ContactList} />
          </Switch>
        </Router>
        {/* <p>{this.state.apiResponse}</p> */}
      </div>
    );
  }
}

export default App;
