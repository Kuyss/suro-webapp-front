import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import EquipmentManagement from './components/admin/EquipmentManagement';
import EquipmentOverview from './components/admin/EquipmentOverview';
import Header from './components/Header';
import Home from './components/Home';
import UserManagement from './components/admin/UserManagement';
import UserOverview from './components/admin/UserOverview';

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
            <Route path="/user_overview" component={UserOverview} /> 
            <Route path="/equipment_management" component={EquipmentManagement} /> 
            <Route path="/equipment_overview" component={EquipmentOverview} /> 
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
