import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

import { onReload as reload } from "./controller";

import Template from "../component/template/Template";
import Navigation from "../component/navigation/Navigation";
import Instructions from "../component/instructions/Instructions";
import { useKey } from "../useKey";

const ROW = 10;
const COLUMN = 19;

const onReload = reload;
// const handleMovingOfActiveCell = move;
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
  const [matrix] = useState(generateMatrix());
  // const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const x = useRef(0);
  const y = useRef(0);
  const inputDirection = useRef(null);

  const handleMovingOfActiveCell = useCallback((transcript = "") => {
    let directionsTrimmed =
      inputDirection.current.value === ""
        ? transcript
        : inputDirection.current.value;
    const RawDirections = inputDirection.current.value.trim().toLowerCase();

    if (/(up|down|right|left|restart)+/.test(RawDirections)) {
      directionsTrimmed = inputDirection.current.value.match(
        /(up|down|right|left|restart)+/
      )[0];
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
      document.querySelector(".active").classList.remove("active");
      document
        .querySelector(`.x${x.current}y${y.current}`)
        .classList.add("active");
      document
        .querySelector(`.x${x.current}y${y.current}`)
        .classList.add("passed");
    }
  }, []);

  useKey("ArrowDown", function () {
    handleMovingOfActiveCell("down");
    // e.view.event.preventDefault();
  });
  useKey("ArrowRight", function () {
    // e.view.event.preventDefault();
    handleMovingOfActiveCell("right");
  });
  useKey("ArrowLeft", function () {
    // e.view.event.preventDefault();
    handleMovingOfActiveCell("left");
  });
  useKey("ArrowUp", function () {
    // e.view.event.preventDefault();
    handleMovingOfActiveCell("up");
  });

  useEffect(
    function () {
      recognition.onstart = () => {
        console.log("listening");
      };
      recognition.onresult = (event) => {
        var transcript = "";
        console.log(event.results);
        // const speechArray = event.results.map((speech) => speech[0].transcript);
        console.log(Object.keys(event.results));
        for (var i = event.resultIndex; i < event.results.length; i++) {
          transcript = event.results[i][0].transcript;
          transcript.replace("\n", "<br>");
        }

        inputDirection.current.value = transcript;
        handleMovingOfActiveCell();
      };

      recognition.onend = () => {
        console.log("ended");
      };
    },
    [handleMovingOfActiveCell]
  );

  function handleListenButton() {
    setIsRecording(true);
    recognition.start();
  }

  function handleDirectionsInput(e) {
    handleMovingOfActiveCell();
  }
  function handleInputKeyDown(e) {
    if (e.keyCode === 13) {
      handleMovingOfActiveCell();
    }
  }

  function handleStopButton() {
    setIsRecording(false);
    onReload();
    recognition.abort();
  }

  return (
    <div className="App">
      <Navigation />
      <Template matrix={matrix} />
      <div className="below">
        <div className="recording">
          <div className="indicator"></div>
          {isRecording ? (
            <p className="record-red">Recording!</p>
          ) : (
            <p className="not-record">Not Recording</p>
          )}
        </div>
        {isRecording ? (
          <div className="stop" onClick={handleStopButton}>
            <div className="stop-outer" />
            <div className="stop-inner" />
          </div>
        ) : (
          <div className="record" onClick={handleListenButton}>
            <div className="record-outer" />
            <div className="record-inner" />
          </div>
        )}
        <div className="input-container">
          <input
            className="directions"
            onChange={handleDirectionsInput}
            ref={inputDirection}
            onKeyDown={(e) => handleInputKeyDown(e)}
          />
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
