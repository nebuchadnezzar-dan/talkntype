import React, { Component, useEffect, useRef, useState } from "react";
import "./App.css";

import { onReload as reload } from "./controller";

import Template from "../component/template/Template";
import Navigation from "../component/navigation/Navigation";
import Instructions from "../component/instructions/Instructions";
import { useKey } from "../useKey";

const ROW = 10;
const COLUMN = 19;

const onReload = reload;
// const onMove = move;
const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = true;

function generateMatrix() {
  const rowDiv = new Array(ROW).fill(new Array(COLUMN).fill({}));

  const matrix = rowDiv.map((row, i, rowArr) => {
    const rowInd = i;
    const rowArrL = rowArr.length - 1;
    return row.map((_, i, arr) => {
      const ilength = arr.length - 1;
      const num = Math.floor(Math.random() * 16 + 1);
      if (rowInd === 0 && i === 0) {
        return {
          className: `cell active rand-${num} upper-left-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else if (rowInd === rowArrL && i === 0) {
        return {
          className: `cell rand-${num} lower-left-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else if (rowInd === 0 && i === ilength) {
        return {
          className: `cell rand-${num} upper-right-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else if (rowInd === rowArrL && i === ilength) {
        return {
          className: `cell rand-${num} lower-right-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else {
        return {
          className: `cell rand-${num} x${rowInd}y${i}`,
          key: rowInd + i,
        };
      }
    });
  });
  // console.log(matrix);
  return matrix;
}

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [directions, setIsDirections] = useState("");
  const [matrix] = useState(generateMatrix());
  // const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const x = useRef(0);
  const y = useRef(0);

  useKey("ArrowDown", function () {
    onMove("down");
  });
  useKey("ArrowRight", function () {
    onMove("right");
  });
  useKey("ArrowLeft", function () {
    onMove("left");
  });
  useKey("ArrowUp", function () {
    onMove("up");
  });

  function onListenClick() {
    setIsRecording(true);
    recognition.start();
    recognition.onstart = () => {
      console.log("listening");
    };

    recognition.onresult = (event) => {
      var transcript = "";
      for (var i = event.resultIndex; i < event.results.length; i++) {
        transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
      }

      setIsDirections(transcript);
      // console.log(transcript);
      onMove(transcript);
      // document.querySelector(".directions").value = transcript;
    };

    recognition.onend = () => {
      console.log("ended");
    };
  }

  function onTest(e) {
    // let directions = document.querySelector(".directions").value;
    onMove();
    setIsDirections(e.target.value);
  }
  function onKeydownHandler(e) {
    if (e.keyCode === 13) {
      // let directions = document.querySelector(".directions").value;
      onMove();
    }
  }

  function onStop() {
    // this.setState({ recording: false });
    setIsRecording(false);
    onReload();
    recognition.abort();
  }

  function onMove(transcript = "") {
    console.log(transcript);
    let directionsTrimmed = directions === "" ? transcript : directions;
    const RawDirections = directions.trim().toLowerCase();
    // let directionsTrimmed;
    if (/(up|down|right|left|restart)+/.test(RawDirections)) {
      directionsTrimmed = directions.match(/(up|down|right|left|restart)+/)[0];
    }

    if (directionsTrimmed === "up") {
      x.current = x.current === 0 ? 0 : +x.current - 1;
    } else if (directionsTrimmed === "down") {
      x.current = x.current === ROW ? ROW : +x.current + 1;
    } else if (directionsTrimmed === "right") {
      y.current = y.current === COLUMN ? COLUMN : +y.current + 1;
    } else if (directionsTrimmed === "left") {
      y.current = y.current === 0 ? 0 : +y.current - 1;
    } else if (directionsTrimmed === "restart") {
      onReload();
      return "reloaded";
    }

    if (document.querySelector(`.x${x.current}y${y.current}`)) {
      console.log(x, y);
      document.querySelector(".active").classList.remove("active");
      document
        .querySelector(`.x${x.current}y${y.current}`)
        .classList.add("active");
      document
        .querySelector(`.x${x.current}y${y.current}`)
        .classList.add("passed");
    }
  }

  return (
    <div className="App">
      <Navigation />
      <Template matrix={matrix} />
      <div className="below">
        <div className="recording">
          {/* {<div className="loading lds-dual-ring" />} */}
          <div className="indicator"></div>
          {isRecording ? (
            <p className="record-red">Recording!</p>
          ) : (
            <p className="not-record">Not Recording</p>
          )}
        </div>
        <div className="record" onClick={onListenClick}>
          <div className="record-outer" />
          <div className="record-inner" />
        </div>
        <div className="input-container">
          <input
            className="directions"
            onChange={onTest}
            value={directions}
            onKeyDown={(e) => onKeydownHandler(e)}
          />
        </div>
        <div className="stop" onClick={onStop}>
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

export default App;
