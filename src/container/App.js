import React, { Component } from "react";
import "./App.css";

import { onReload as reload, onMove as move } from "./controller";
import { token as tokenFromApiToken } from "./apitoken";

import Template from "../component/template/Template";
import Navigation from "../component/navigation/Navigation";
import Instructions from "../component/instructions/Instructions";

import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";

const onReload = reload;
const onMove = move;

class App extends Component {
  constructor() {
    super();
    this.state = {};
    //checking
  }

  onListenClick = async () => {
    await this.setState({ loading: true });
    console.log(this.state.loading);
    await fetch(tokenFromApiToken)
      .then((response) => {
        return response.text();
      })
      .then((token) => {
        const stream = recognizeMic({
          access_token: token, // use `access_token` as the parameter name if using an RC service
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false, // optional - performs basic formatting on the results such as capitals an periods
        });
        this.setState({ loading: false, recording: true });
        // console.log(this.state.loading);
        stream.on("data", (data) => {
          const directions = data.alternatives[0].transcript;
          document.querySelector(".directions").value = directions;
          this.onTest();
          // console.log(data.alternatives[0].transcript);
        });
        stream.on("error", function (err) {
          console.log(err);
        });
        document.querySelector(".stop").onclick = stream.stop.bind(stream);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onTest = () => {
    let directions = document.querySelector(".directions").value;
    onMove(directions);
  };
  onKeydownHandler = (e) => {
    if (e.keyCode === 13) {
      let directions = document.querySelector(".directions").value;
      onMove(directions);
    }
  };

  onStop = () => {
    this.setState({ recording: false });
    onReload();
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Template />
        <div className="below">
          <div className="recording">
            {this.state.loading ? <div className="lds-dual-ring" /> : ""}
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
            <input
              className="directions"
              onChange={this.onTest}
              onKeyDown={this.onKeydownHandler.bind(this)}
            />
          </div>
          <div className="stop" onClick={this.onStop}>
            <div className="stop-outer" />
            <div className="stop-inner" />
          </div>
          <div className="reload" onClick={onReload}>
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
