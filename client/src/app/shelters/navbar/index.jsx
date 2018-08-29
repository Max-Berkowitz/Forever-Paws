import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
          Paws
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/petupload">
              <span style={{ color: 'white', marginLeft: '40px' }}>Add Pet</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orgpets">
              <span style={{ color: 'white', marginLeft: '40px' }}>Pets</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account">
              <span style={{ color: 'white', marginLeft: '40px' }}>Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
