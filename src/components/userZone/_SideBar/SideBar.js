import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { connect } from 'react-redux';
import DatabaseApi from '../../../../src/services/dbApi'
import AuthApi from '../../../../src/services/authApi'
import { setUserInfo } from '../../../../src/redux/actions/authActions';



class SideBar extends Component {

  render() {

    const {user} = this.props

    return (
      
      <ul className="sidebar">
        <li className="side-links">
          <NavLink to={`/user/${user.id}/your-library`} 
            activeStyle={activeCss}>
              Your Library
          </NavLink>
        </li>
        <li className="side-links">
          <NavLink exact to={`/user/${user.id}/personal-detail`}
            activeStyle={activeCss}>
              Your Details
          </NavLink>
        </li>
        <li className="side-links">
          <NavLink to={`/user/${user.id}/messages`}
            activeStyle={activeCss}>
              Messages
          </NavLink>
        </li>
      </ul>

    
    );
  }
}

const activeCss = {backgroundColor: '#de774e', color: 'white'}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(SideBar);




