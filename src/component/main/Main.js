import React from "react";
import "./Main.css";

const Main = ({ matrix }) => {
  console.log(matrix);

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
