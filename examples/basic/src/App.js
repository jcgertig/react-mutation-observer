import React, { Component } from 'react';
import MutationObserver from 'react-mutation-observer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MutationObserver
          onContentChange={console.log.bind(null, 'Change content triggered.')}
          onAttributeChange={console.log.bind(null, 'Change attribute triggered.')}
          onChildRemoval={console.log.bind(null, 'Child removal triggered.')}
          onChildAddition={console.log.bind(null, 'Child addition triggered.')}
        >
          <div className="App-intro">
            To get started, edit src/App.js and save to reload.
          </div>
        </MutationObserver>
      </div>
    );
  }
}

export default App;
