import React from "react";
import "./Main.css";

const Main = ({ matrix, passedCells, backgroundImage }) => {
  // const backgroundImage = Math.floor(Math.random() * 6);
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
        <div className={`map map-image-${backgroundImage}`}>
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
