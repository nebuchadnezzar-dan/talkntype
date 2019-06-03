import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div>
      <div className="instructions" />
      <div className="instructions-container">
        <h2>Instructions</h2>
        <p>
          A grumpy doge is hidden inside that cover! If you want to see it, all
          you have to do is instruct your browser to clear the cover by pressing
          the record button and say the magic commands (UP, DOWN, LEFT and
          RIGHT) to control the direction of clearing each blocks!
        </p>
        <p>
          If somehow you do not possess the possess the ability to speak to your
          browser directly, then you can use the text field to type in the same
          commands as the ones above!
        </p>
      </div>
      <div className="instructions-below" />
    </div>
  );
};

export default Instructions;
