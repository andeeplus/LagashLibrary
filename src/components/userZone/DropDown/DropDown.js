import React, { Component } from 'react';

export default class Dropdown extends Component {


  state = {
       displayMenu: false
     }



showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {

    const {chooseFavo} = this.props

    return (
        <div  className="dropdown" >
         <div className="buttonMenu" onClick={this.showDropdownMenu}> {this.props.children}</div>

          { this.state.displayMenu ? (
          <ul>
         <li><p onClick={() => chooseFavo('artists')}>Artists</p></li>
         <li><p onClick={() => chooseFavo('labels')}>Labels</p></li>
         <li><p onClick={() => chooseFavo('records')}>Records</p></li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

