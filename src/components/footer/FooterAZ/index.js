import React, { Component } from 'react';
import azImg from '../../../img/yin_yang.svg'

class FooterAZ extends Component {
  render() {
    return (
      <div 
      className="footerAZ">
        <p>A</p>
          <img 
            className="rotating-block" 
            src={azImg}
            alt="AZ"
          >
        </img>
        <p>Z</p>
      </div>
    );
  }
}

export default FooterAZ;