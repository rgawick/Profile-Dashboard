import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <div>
        <Menu/>
        {this.props.children}
      </div>
      
    );
  }
}

export default App;
