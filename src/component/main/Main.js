import React from "react";
import "./Main.css";

const Main = ({ matrix, passedCells }) => {
  passedCells.forEach((e, i) => {
    matrix[e.x][e.y] = {
      ...matrix[e.x][e.y],
      className: matrix[e.x][e.y].className.replace("active", " ") + " passed",
    };
    if (passedCells.length - 1 === i)
      matrix[e.x][e.y] = {
        ...matrix[e.x][e.y],
        className: matrix[e.x][e.y].className + " active",
      };
  });
  if (passedCells.length > 0)
    matrix[0][0] = {
      ...matrix[0][0],
      className: matrix[0][0].className.replace("active", " ") + " passed",
    };

  return (
    <div className="main">
      <div className="content">
        <div className="map map-image-1">
          {matrix.map((matrixRow, i) => {
            return (
              <div className="rows" key={i}>
                {matrixRow.map((cell) => (
                  <div className={cell.className} key={cell.key} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
