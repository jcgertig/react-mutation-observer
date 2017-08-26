import React, { Component } from 'react';
import MutationObserver from 'react-mutation-observer';
import logo from './logo.svg';
import './App.css';

class Test extends Component {
  state = {
    a: [],
    c: 0
  };

  click = () => {
    this.setState({ c: this.state.c + 1 });
  }

  add = () => {
    const { a, c } = this.state;
    a.push('item ' + c);
    this.setState({ a });
  }

  render() {
    return (
      <div onClick={this.click}>
        Clicks {this.state.c}
        <div>
          {this.state.a.map((i, key) => (
            <div key={key}>{i}</div>
          ))}
        </div>
        <span onClick={this.add}>Add</span>
      </div>
    );
  }
}

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
          <Test />
        </MutationObserver>
      </div>
    );
  }
}

export default App;
