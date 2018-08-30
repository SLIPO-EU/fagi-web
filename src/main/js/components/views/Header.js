import React from 'react';
import { Navbar } from 'react-bootstrap';
//<label>&nbsp;FAGI</label>
class Header extends React.Component {
  render() {
    return (
      <div className="logo">
        <Navbar.Header>
            <div >
              <img src={require('../../../scss/img/fagi_logo.jpg')} />
            </div>
        </Navbar.Header>
      </div>
    );
  }
}

export default Header;