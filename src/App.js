import React, { Component } from 'react';
import { BrowserRouter, Link, Route, IndexRoute } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';

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
            <Route path="/about" component={About} /> 
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
