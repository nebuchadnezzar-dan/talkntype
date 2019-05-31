import React from 'react';
import './Main.css';

const Main = () => {
  const rowDiv = [];
  for (let i = 0; i < 10; i++) {
    rowDiv.push([]);
    for (let j = 0; j < 10; j++) {
      rowDiv[i].push(<div className="cell" />);
    }
  }
  console.log(rowDiv);
  return (
    <div className="main">
      <div className="section text-center">
        <div className="map">
          {rowDiv.map((row, i) => {
            const rowInd = i;
            return (
              <div className="rows">
                {row.map((cell, i) => {
                  if (rowInd === 0 && i === 0) {
                    return (
                      <div
                        className="cell active"
                        data-cell={`(${rowInd},${i})`}
                      />
                    );
                  } else {
                    return (
                      <div className="cell" data-cell={`(${rowInd},${i})`} />
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
