import React from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <div className="logo">
        <Navbar.Header>
            <div className="logoLabel">
            <label>FAGI</label>
            </div>
        </Navbar.Header>
      </div>
    );
  }
}

export default Header;