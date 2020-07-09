import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Ipps from './components/Ipps'
import IppPage from './components/IppPage'
//import { render } from '@testing-library/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    ipps: []
  };

  componentDidMount() {
    axios.get('/api/i/ipps').then(res => {
      this.setState({ ipps: res.data })
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/ipps"
            render={props => (
              <React.Fragment>
                <Ipps ipps={this.state.ipps} />
              </React.Fragment>
            )}
          />
          <Route exact path="/ipps/:id"
            render={props => (
              <React.Fragment>
                <IppPage ipps={this.state.ipps}  {...props} />
              </React.Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
