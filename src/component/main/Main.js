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
        <div className="map map-image-1">
          {rowDiv.map((row, i, rowArr) => {
            const rowInd = i;
            const rowArrL = rowArr.length - 1;
            return (
              <div className="rows" key={i}>
                {row.map((cell, i, arr) => {
                  const ilength = arr.length - 1;
                  const num = Math.floor(Math.random() * 16 + 1);
                  if (rowInd === 0 && i === 0) {
                    return (
                      <div
                        className={`cell active rand-${num} upper-left-edge x${rowInd}y${i}`}
                        key={rowInd + i}
                      />
                    );
                  } else if (rowInd === rowArrL && i === 0) {
                    return (
                      <div
                        className={`cell rand-${num} lower-left-edge x${rowInd}y${i}`}
                        key={rowInd + i}
                      />
                    );
                  } else if (rowInd === 0 && i === ilength) {
                    return (
                      <div
                        className={`cell rand-${num} upper-right-edge x${rowInd}y${i}`}
                        key={rowInd + i}
                      />
                    );
                  } else if (rowInd === rowArrL && i === ilength) {
                    return (
                      <div
                        className={`cell rand-${num} lower-right-edge x${rowInd}y${i}`}
                        key={rowInd + i}
                      />
                    );
                  } else {
                    return (
                      <div
                        className={`cell rand-${num} x${rowInd}y${i}`}
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
