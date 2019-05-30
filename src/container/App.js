import React, { Component } from 'react';
import './App.css';

import Template from '../component/template/Template';
import Navigation from '../component/navigation/Navigation';

class App extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Template />
      </div>
    );
  }
}

export default App;
