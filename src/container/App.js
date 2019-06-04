import React, { Component } from 'react';
import './App.css';

import Template from '../component/template/Template';
import Navigation from '../component/navigation/Navigation';
import Instructions from '../component/instructions/Instructions';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

const onMove = directions => {
  directions = directions.trim().toLowerCase();
  let directionsTrimmed;
  if (/(up|down|right|left)+/.test(directions)) {
    directionsTrimmed = directions.match(/(up|down|right|left)+/)[0];
  }
  let x = document
    .querySelector('.active')
    .getAttribute('class')
    .match(/x\d+/)[0]
    .match(/\d+/)[0];
  let y = document
    .querySelector('.active')
    .getAttribute('class')
    .match(/y\d+/)[0]
    .match(/\d+/)[0];
  if (directionsTrimmed === 'up') {
    x = +x - 1;
  } else if (directionsTrimmed === 'down') {
    x = +x + 1;
  } else if (directionsTrimmed === 'right') {
    y = +y + 1;
  } else if (directionsTrimmed === 'left') {
    y = +y - 1;
  }

  if (document.querySelector(`.x${x}y${y}`)) {
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`.x${x}y${y}`).classList.add('active');
    document.querySelector(`.x${x}y${y}`).classList.add('passed');
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onListenClick = async () => {
    await this.setState({ loading: true });
    console.log(this.state.loading);
    await fetch(
      'https://fathomless-atoll-29830.herokuapp.com/api/speech-to-text/token'
    )
      .then(response => {
        return response.text();
      })
      .then(token => {
        const stream = recognizeMic({
          access_token: token, // use `access_token` as the parameter name if using an RC service
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false // optional - performs basic formatting on the results such as capitals an periods
        });
        this.setState({ loading: false, recording: true });
        // console.log(this.state.loading);
        stream.on('data', data => {
          const directions = data.alternatives[0].transcript;
          document.querySelector('.directions').value = directions;
          this.onTest();
          // console.log(data.alternatives[0].transcript);
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
    let directions = document.querySelector('.directions').value;
    onMove(directions);
  };

  onReload = () => {
    document.querySelectorAll('.cell').forEach(el => {
      el.classList.remove('passed');
    });
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.x0y0').classList.add('active');
  };
  onStop = () => {
    this.setState({ recording: false });
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Template />
        <div className="below">
          <div className="recording">
            {this.state.loading ? <div class="lds-dual-ring" /> : ''}
            {this.state.recording ? (
              <p className="record-red">Recording!</p>
            ) : (
              <p className="not-record">Not Recording</p>
            )}
          </div>
          <div className="record" onClick={this.onListenClick}>
            <div className="record-outer" />
            <div className="record-inner" />
          </div>
          <div className="input-container">
            <input className="directions" onChange={this.onTest} />
          </div>
          <div className="stop" onClick={this.onStop}>
            <div className="stop-outer" />
            <div className="stop-inner" />
          </div>
          <div className="reload" onClick={this.onReload}>
            <div className="reload-outer">
              <div className="reload-inner">&#x21ba;</div>
            </div>
          </div>
        </div>
        <Instructions />
      </div>
    );
  }
}

export default App;
