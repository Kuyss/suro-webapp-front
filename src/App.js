import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import EquipmentManagement from './components/admin/EquipmentManagement/EquipmentManagement';
import Header from './components/Header';
import Home from './components/Home';
import UserManagement from './components/admin/UserManagement/UserManagement';

import ActiveReservations from './components/user/ActiveReservations/ActiveReservations.js';
import SearchEquipment from './components/user/SearchEquipment/SearchEquipment.js';
import History from './components/user/History/History.js';

const Container = (props) =>
  <div>
    <Header />
    {props.children}
  </div>

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/user_management" component={UserManagement} />
            <Route path="/equipment_management" component={EquipmentManagement} />

            <Route path="/search_equipment" component={SearchEquipment} />
            <Route path="/active_reservations" component={ActiveReservations} />
            <Route path="/history" component={History} />
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
