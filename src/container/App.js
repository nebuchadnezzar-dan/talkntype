import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import Template from "../component/template/Template";
import Navigation from "../component/navigation/Navigation";
import Instructions from "../component/instructions/Instructions";
import { useKey } from "../hooks/useKey";
import { COLUMN, ROW, generateMatrix } from "../utils/helper";
import Bar from "../component/bar/Bar";

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = true;

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [matrix, setMatrix] = useState(generateMatrix());
  const [passedCells, setPassedCells] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(0);

  const x = useRef(0);
  const y = useRef(0);
  const inputDirection = useRef(null);

  const handleStopButton = useCallback(() => {
    setIsRecording(false);
    reloadMatrix();
    recognition.abort();
  }, []);

  const handleMovingOfActiveCell = useCallback(
    (transcript = "") => {
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
        x.current = x.current === ROW - 1 ? ROW - 1 : +x.current + 1;
      } else if (directionsTrimmed === "right") {
        y.current = y.current === COLUMN - 1 ? COLUMN - 1 : +y.current + 1;
      } else if (directionsTrimmed === "left") {
        y.current = y.current === 0 ? 0 : +y.current - 1;
      } else if (directionsTrimmed === "restart") {
        handleStopButton();
        reloadMatrix();
        return "reloaded";
      }

      if (
        !(
          passedCells.at(-1)?.x === x.current &&
          passedCells.at(-1)?.y === y.current
        )
      )
        setPassedCells([...passedCells, { x: x.current, y: y.current }]);
    },
    [passedCells, handleStopButton]
  );

  useKey("ArrowDown", function () {
    handleMovingOfActiveCell("down");
  });
  useKey("ArrowRight", function () {
    handleMovingOfActiveCell("right");
  });
  useKey("ArrowLeft", function () {
    handleMovingOfActiveCell("left");
  });
  useKey("ArrowUp", function () {
    handleMovingOfActiveCell("up");
  });

  useEffect(
    function () {
      recognition.onstart = () => {
        console.log("listening");
      };
      recognition.onresult = (event) => {
        var transcript = "";
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

  function reloadMatrix() {
    setMatrix(generateMatrix());
    setPassedCells([]);
    setBackgroundImage(Math.floor(Math.random() * 6));
    Math.floor(Math.random() * 6);
    inputDirection.current.value = "";

    x.current = 0;
    y.current = 0;
    console.log("reloaded");
  }

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

  return (
    <div className="App">
      <Navigation />
      <Template
        matrix={matrix}
        passedCells={passedCells}
        backgroundImage={backgroundImage}
      />
      <Bar
        isRecording={isRecording}
        handleListenButton={handleListenButton}
        handleStopButton={handleStopButton}
        handleDirectionsInput={handleDirectionsInput}
        inputDirection={inputDirection}
        handleInputKeyDown={handleInputKeyDown}
        reloadMatrix={reloadMatrix}
      />
      <Instructions />
    </div>
  );
}

export default App;
