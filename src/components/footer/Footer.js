import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import FooterAZ from './FooterAZ/'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import AuthApi from '../../../src/services/authApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends Component {



  logout = () => {
    const error = AuthApi.logout();

    if(!error){
      console.log("Some error occured");
    }
  }

  render() {

    const {user} = this.props

    return (
    <footer>
      <div className="foot-logo">
      <p>LAGASH LIBRARY</p>
      </div>
      <FooterAZ />
      <ul className="foot-bar">
        <li className="foot-links"><NavLink to='/'>Home</NavLink></li>
        <li className="foot-links"><NavLink to='/search'>Search</NavLink></li>
        {!user
          ? <li className="foot-links">
            <NavLink to='/login'>
              <FontAwesomeIcon icon="sign-in-alt" />
            </NavLink>
        </li>
          : <li className="foot-links icon-log">
            <NavLink to='' onClick={() => this.logout()}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
          </li>  
        }
      </ul>
      
    </footer>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default withRouter(connect(mapStateToProps)(Footer));
