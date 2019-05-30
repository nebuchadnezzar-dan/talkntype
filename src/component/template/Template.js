import React from 'react';
import './Template.css';
import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

const Template = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Template;
