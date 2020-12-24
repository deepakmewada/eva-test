import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import RealtimeGraph from './components/RealtimeGraph';

class App extends Component {
  render() {    
    return (
      <>
      <Container>
		    <RealtimeGraph/>
      </Container>
      </>
    );
  }
}

export default App;
