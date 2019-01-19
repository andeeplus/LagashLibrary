import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import FooterAZ from './FooterAZ/'

class Footer extends Component {
  render() {
    return (
    <footer>
      <div className="foot-logo">
      <p>LAGASH LIBRARY</p>
      </div>
      <FooterAZ />
      <ul className="foot-bar">
        <li className="foot-links"><NavLink to='/'>Home</NavLink></li>
        <li className="foot-links"><NavLink to='/search'>Search</NavLink></li>
        <li className="foot-links"><NavLink to='/login'>Log In</NavLink></li>
      </ul>
      
    </footer>

    );
  }
}

export default Footer;