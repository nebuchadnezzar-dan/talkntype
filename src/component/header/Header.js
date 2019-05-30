import React from 'react';
import './Header.css';

const Header = () => {
  const headerStyle = url => {
    return { backgroundImage: url };
  };
  return (
    <div
      className="page-header section-dark"
      style={headerStyle(
        "url('https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/antoine-barres.jpg')"
      )}
    >
      <div className="filter" />
      <div className="content-center">
        <div className="container">
          <div className="title-brand">
            <h1 className="presentation-title">Title here</h1>
            <div className="fog-low">
              <img
                src="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/fog-low.png"
                alt=""
              />
            </div>
            <div className="fog-low right">
              <img
                src="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/fog-low.png"
                alt=""
              />
            </div>
          </div>

          <h2 className="presentation-subtitle text-center">
            You can add a small description
          </h2>
        </div>
      </div>
      <div
        className="moving-clouds"
        style={headerStyle(
          "url('https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/clouds.png')"
        )}
      />
    </div>
  );
};

export default Header;
