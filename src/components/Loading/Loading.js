import React, { Component } from 'react';
import vinyl from '../../img/vinyl.svg'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
       <img className="spinner" src={vinyl} alt="spinner"/>
      </div>
    );
  }
}

