import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { connect } from 'react-redux';
import DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { setUserInfo } from '../../../src/redux/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class UserArea extends Component {

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
    return (
      <div className="icon-menu">
      <div className="icon-menu-item">
      <NavLink exact to={`/user/${user.id}/personal-detail`}>
      <FontAwesomeIcon className="icon-svg" icon="user" />
            Your Details
        </NavLink>
      </div>
      <div className="icon-menu-item">
      <NavLink to={`/user/${user.id}/your-library`}>
      <FontAwesomeIcon className="icon-svg" icon="book" />
            Your Library
        </NavLink>
      </div>
      <div className="icon-menu-item">
      <NavLink to={`/user/${user.id}/your-favourites`}>
      <FontAwesomeIcon className="icon-svg" icon="heart" />
            Favourites
        </NavLink>
      </div>
      <div className="icon-menu-item">
      <NavLink to={`/user/${user.id}/messages`}>
      <FontAwesomeIcon className="icon-svg" icon="envelope" />
            Messages
        </NavLink>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(UserArea));





