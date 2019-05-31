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
        "url('https://cdn.pixabay.com/photo/2016/08/05/09/31/banner-1571858_960_720.jpg')"
      )}
    >
      <div className="filter" />
      <div className="content-center">
        <div className="container">
          <h2 className="presentation-subtitle text-center">Title</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
