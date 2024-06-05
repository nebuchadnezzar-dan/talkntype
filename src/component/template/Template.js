import React from "react";
import Main from "../main/Main";
import Footer from "../footer/Footer";

const Template = ({ matrix, passedCells }) => {
  return (
    <div className="wrapper">
      <Main matrix={matrix} passedCells={passedCells} />
      <Footer />
    </div>
  );
};

export default Template;
