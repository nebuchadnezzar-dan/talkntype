import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-transparent"
      color-on-scroll="500"
    >
      <div className="container">
        <div className="navbar-translate">
          <button
            className="navbar-toggler navbar-toggler-right navbar-burger"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-bar" />
            <span className="navbar-toggler-bar" />
            <span className="navbar-toggler-bar" />
          </button>
          <a className="navbar-brand" href="#">
            Logo
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                rel="tooltip"
                title="Star on GitHub"
                data-placement="bottom"
                href="https://github.com/nebuchadnezzar-dan"
                target="_blank"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
