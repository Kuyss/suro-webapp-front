import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import EquipmentManagement from './components/admin/EquipmentManagement/EquipmentManagement';
import Header from './components/Header';
import Home from './components/Home';
import UserManagement from './components/admin/UserManagement/UserManagement';

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
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
