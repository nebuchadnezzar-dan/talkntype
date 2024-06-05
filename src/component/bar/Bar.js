import React from "react";

function Bar({
  isRecording,
  handleListenButton,
  handleStopButton,
  handleDirectionsInput,
  inputDirection,
  handleInputKeyDown,
  reloadMatrix,
}) {
  return (
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
        <div className="stop" role="button" onClick={handleStopButton}>
          <div className="stop-outer" />
          <div className="stop-inner" />
        </div>
      ) : (
        <div className="record" role="button" onClick={handleListenButton}>
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
      <div className="reload" onClick={reloadMatrix}>
        <div className="reload-outer">
          <div className="reload-inner">&#x21ba;</div>
        </div>
      </div>
    </div>
  );
}

export default Bar;
