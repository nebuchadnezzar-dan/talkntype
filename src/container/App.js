import React, { Component } from 'react';
import './App.css';

import Template from '../component/template/Template';
import Navigation from '../component/navigation/Navigation';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onListenClick = () => {
    fetch('http://localhost:3002/api/speech-to-text/token')
      .then(function(response) {
        return response.text();
      })
      .then(function(token) {
        var stream = recognizeMic({
          access_token: token, // use `access_token` as the parameter name if using an RC service
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.on('data', function(data) {
          console.log(data.alternatives[0].transcript);
        });
        stream.on('error', function(err) {
          console.log(err);
        });
        document.querySelector('.stop').onclick = stream.stop.bind(stream);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onTest = () => {
    console.log('works');
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Template />
        <button onClick={this.onListenClick}>Start Recording</button>
        <button className="stop">Stop</button>
      </div>
    );
  }
}

export default App;
