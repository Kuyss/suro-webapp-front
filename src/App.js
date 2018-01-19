import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history'

import EquipmentManagement from './components/admin/EquipmentManagement/EquipmentManagement';
import Header from './components/Header';
import Login from './components/Login.js';
import UserManagement from './components/admin/UserManagement/UserManagement';
import Register from './components/Register';
import ActiveReservations from './components/user/ActiveReservations/ActiveReservations';
import SearchEquipment from './components/user/SearchEquipment/SearchEquipment';
import History from './components/user/History/History';

const Container = (props) =>
  <div>
    <Header />
    {props.children}
  </div>

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Container>
            <Route exact path="/" component={Login} />
            <Route path="/user_management" component={UserManagement} />
            <Route path="/equipment_management" component={EquipmentManagement} />
            <Route path="/register" component={Register} />
            <Route path="/search_equipment" component={SearchEquipment} />
            <Route path="/active_reservations" component={ActiveReservations} />
            <Route path="/history" component={History} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
