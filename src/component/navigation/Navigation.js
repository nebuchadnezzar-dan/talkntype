import React from 'react';
import './Navigation.css';

import { ReactComponent as Logo } from '../../img/mic.svg';
import { ReactComponent as Github } from '../../img/github.svg';

const Navigation = () => {
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-transparent"
      color-on-scroll="500"
    >
      <div className="container">
        <div className="logo-container">
          <Logo className="logo" />
          <p className="title">Talk n' Type</p>
        </div>
        <div className="title-container">
          <Github />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
