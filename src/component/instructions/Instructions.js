import React from "react";
import "./Instructions.css";

const Instructions = () => {
  return (
    <div>
      <div className="instructions" />
      <div className="instructions-container">
        <h2>Instructions</h2>
        <p>
          A doge is hidden inside that cover! If you want to see it, all you
          have to do is instruct your browser to clear the cover by pressing the
          record <span className="rec">&#x2022;</span> button and say the magic
          commands &ensp;
          <span className="censor">
            key words:(UP, DOWN, LEFT and RIGHT)
          </span>{" "}
          to control the direction of clearing each blocks!
        </p>
        <p>
          If somehow you do not possess the possess the ability to speak to your
          browser directly, then you can use the text field to type in the same
          commands as the ones above! (or use your your arrow keys{" "}
          <span role="img" aria-label="arrow keys">
            ⬅️⬆️➡️⬇️
          </span>
          )
        </p>
        <p>Press the stop &#9632; button if you want to stop recording!</p>
        <p>
          Press the reload &#x21ba; button or say/type{" "}
          <em className="censor">restart</em> if you want to restart!
        </p>
      </div>
      <div className="instructions-below" />
    </div>
  );
};

export default Instructions;
