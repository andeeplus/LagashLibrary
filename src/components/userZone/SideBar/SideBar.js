import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { connect } from 'react-redux';
import DatabaseApi from '../../../../src/services/dbApi'
import AuthApi from '../../../../src/services/authApi'
import { setUserInfo } from '../../../../src/redux/actions/authActions';



class SideBar extends Component {

  state = {
    user: {}
  }

  componentDidMount(){
    AuthApi.registerAuthObserver(async (user) => {
      console.log("​App -> componentDidMount -> user", user)
      let userData = null;
      if (user) {
        userData = await DatabaseApi.getDocumentById('user', user.uid);
        if(!userData){ 
          console.log("Please verify your Firebase setup");
        }
      } 
      this.props.setUser(userData);
      this.setState({user:userData, loading: false});
    });
  }

  render() {

    const {user} = this.state
    console.log('we have the user',this.state.user)

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


const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(SideBar));



