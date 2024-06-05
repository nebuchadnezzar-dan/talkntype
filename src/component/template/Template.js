import React from "react";
import Main from "../main/Main";
import Footer from "../footer/Footer";

const Template = (props) => {
  return (
    <div className="wrapper">
      <Main {...props} />
      <Footer />
    </div>
  );
};

export default Template;
