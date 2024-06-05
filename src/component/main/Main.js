import React from "react";
import "./Main.css";

const Main = ({ matrix, passedCells }) => {
  const newMatrix = matrix.slice();
  passedCells.forEach((e, i) => {
    newMatrix[e.x][e.y] = {
      ...newMatrix[e.x][e.y],
      className:
        newMatrix[e.x][e.y].className.replace("active", " ") + " passed",
    };
    if (passedCells.length - 1 === i)
      newMatrix[e.x][e.y] = {
        ...newMatrix[e.x][e.y],
        className: newMatrix[e.x][e.y].className + " active",
      };
    console.log(i, passedCells.length);
  });
  if (passedCells.length > 0)
    newMatrix[0][0] = {
      ...newMatrix[0][0],
      className: newMatrix[0][0].className.replace("active", " ") + " passed",
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
