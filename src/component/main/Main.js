import React from 'react';
import './Main.css';

const Main = () => {
  const row = 10;
  const column = 19;
  const rowDiv = [];
  for (let i = 0; i < row; i++) {
    rowDiv.push([]);
    for (let j = 0; j < column; j++) {
      rowDiv[i].push(<div className="cell" />);
    }
  }
  return (
    <div className="main">
      <div className="content">
        <div className="map">
          {rowDiv.map((row, i) => {
            const rowInd = i;
            return (
              <div className="rows" key={i}>
                {row.map((cell, i) => {
                  if (rowInd === 0 && i === 0) {
                    return (
                      <div
                        className={`cell active x${rowInd}y${i}`}
                        key={rowInd + i}
                      />
                    );
                  } else {
                    return (
                      <div
                        className={`cell x${rowInd}y${i}`}
                        key={rowInd + i}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
