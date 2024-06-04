import React from "react";
import Main from "../main/Main";
import Footer from "../footer/Footer";

const Template = ({ matrix }) => {
  return (
    <div className="wrapper">
      <Main matrix={matrix} />
      <Footer />
    </div>
  );
};

export default Template;
